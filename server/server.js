const http = require('node:http');
const { initializeDatabase } = require('../database/database');

const port = Number(process.env.PORT || 3000);
const db = initializeDatabase();

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PATCH, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(body));
}

function getDevice(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    icon: row.icon,
    status: Boolean(row.status),
  };
}

async function readBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) {
      throw new Error('Request body is too large.');
    }
  }
  return JSON.parse(body || '{}');
}

function route(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PATCH, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    response.end();
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/devices') {
    const devices = db.prepare('SELECT * FROM devices ORDER BY id').all();
    sendJson(response, 200, devices.map(getDevice));
    return;
  }

  const deviceMatch = url.pathname.match(/^\/api\/devices\/(\d+)$/);
  if (deviceMatch && request.method === 'PATCH') {
    readBody(request).then((body) => {
      if (typeof body.status !== 'boolean') {
        sendJson(response, 400, { error: 'status must be a boolean.' });
        return;
      }

      const result = db.prepare(
        'UPDATE devices SET status = ? WHERE id = ?'
      ).run(body.status ? 1 : 0, Number(deviceMatch[1]));
      if (result.changes === 0) {
        sendJson(response, 404, { error: 'Device was not found.' });
        return;
      }

      const device = db.prepare('SELECT * FROM devices WHERE id = ?')
        .get(Number(deviceMatch[1]));
      sendJson(response, 200, getDevice(device));
    }).catch((error) => sendJson(response, 400, { error: error.message }));
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/sensors/latest') {
    const reading = db.prepare(`
      SELECT temperature, humidity, light_level, recorded_at
      FROM sensor_readings
      ORDER BY recorded_at DESC, id DESC
      LIMIT 1
    `).get();
    sendJson(response, 200, {
      temperature: reading.temperature,
      humidity: reading.humidity,
      lightLevel: reading.light_level,
      recordedAt: reading.recorded_at,
    });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/sensors/readings') {
    readBody(request).then((body) => {
      const values = ['temperature', 'humidity', 'lightLevel'];
      if (!values.every((key) => Number.isFinite(body[key]))) {
        sendJson(response, 400, {
          error: 'temperature, humidity, and lightLevel must be numbers.',
        });
        return;
      }

      db.prepare(`
        INSERT INTO sensor_readings
          (temperature, humidity, light_level, device_id, recorded_at)
        VALUES (?, ?, ?, ?, ?)
      `).run(body.temperature, body.humidity, body.lightLevel, body.deviceId || null,
        new Date().toISOString());
      sendJson(response, 201, { message: 'Sensor reading recorded.' });
    }).catch((error) => sendJson(response, 400, { error: error.message }));
    return;
  }

  sendJson(response, 404, { error: 'Route was not found.' });
}

const server = http.createServer((request, response) => {
  try {
    route(request, response);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
});

server.listen(port, () => {
  console.log(`Smart home API listening on http://localhost:${port}`);
});

function closeDatabase() {
  db.close();
  server.close();
}

process.on('SIGINT', closeDatabase);
process.on('SIGTERM', closeDatabase);
