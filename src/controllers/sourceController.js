const { Source } = require('../models');

exports.createSource = async (req, res) => {
  const source = await Source.create({ name: req.body.name });
  res.status(201).send(source);
};

exports.getSources = async (req, res) => {
  const sources = await Source.all();
  res.status(201).send(sources);
};

exports.updateSource = async (req, res) => {
  const source = await Source.findById(req.params.sourceID);

  if (!source) {
    return res.status(404).send({
      message: 'Source Not Found',
    });
  }

  const updatedSource = await source.update({
    name: req.body.name || source.name,
  });
  return res.status(200).send(updatedSource);
};

exports.deleteSource = async (req, res) => {
  const source = await Source.findById(req.params.sourceID);

  if (!source) {
    return res.status(400).send({
      message: 'source Not Found',
    });
  }

  await source.destroy();
  return res.status(200).send();
};
