const mqtt = require('mqtt');
const { MongoClient } = require('mongodb');

// Configuración
const MQTT_BROKER = 'mqtt://broker.hivemq.com';
const TOPIC = 'cooler/fridge-demo';
