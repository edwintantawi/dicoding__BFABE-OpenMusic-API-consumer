const amqp = require('amqplib');
const { SongsService } = require('./SongsService');
const { MailSender } = require('./MailSender');
const { Listener } = require('./Listener');
const { RABBITMQ_CONFIG } = require('./config');

const init = async () => {
  const { RABBITMQ_SERVER, QUEUE } = RABBITMQ_CONFIG;
  const songsService = new SongsService();
  const mailSender = new MailSender();
  const listener = new Listener(songsService, mailSender);

  const connection = await amqp.connect(RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  channel.assertQueue(QUEUE, { durable: true });

  channel.consume(QUEUE, listener.listen, { noAck: true });
};

init();
