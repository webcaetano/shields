'use strict';

const Joi = require('joi');
const ServiceTester = require('./runner/service-tester');

const t = new ServiceTester({ id: 'github', title: 'GitHub' });
module.exports = t;

t.create('License')
  .get('/license/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('license'),
    value: Joi.string()
  }));

t.create('Contributors')
  .get('/contributors/cdnjs/cdnjs.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('contributors'),
    value: Joi.number().integer().positive()
  }));

t.create('GitHub closed pull request')
  .get('/issues-pr-closed/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('closed pull requests'),
    value: Joi.string().regex(/^\w+\sclosed$/)
  }));

t.create('GitHub closed pull request raw')
  .get('/issues-pr-closed-raw/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('closed pull requests'),
    value: Joi.string().regex(/^\w+?$/)
  }));

t.create('GitHub pull request')
  .get('/issues-pr/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('pull requests'),
    value: Joi.string().regex(/^\w+\sopen$/)
  }));

t.create('GitHub pull request raw')
  .get('/issues-pr-raw/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('pull requests'),
    value: Joi.string().regex(/^\w+?$/)
  }));

t.create('GitHub pull request')
  .get('/issues-closed/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('closed issues'),
    value: Joi.string().regex(/^\w+\+?\sclosed$/)
  }));

t.create('GitHub pull request raw')
  .get('/issues-closed-raw/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('closed issues'),
    value: Joi.string().regex(/^\w+\+?$/)
  }));

t.create('GitHub issues')
  .get('/issues/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('issues'),
    value: Joi.string().regex(/^\w+\sopen$/)
  }));

t.create('GitHub issues raw')
  .get('/issues-raw/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('issues'),
    value: Joi.string().regex(/^\w+$/)
  }));

t.create('downloads for release without slash')
  .get('/downloads/atom/atom/v0.190.0/total.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('downloads'),
    value: Joi.not('none')
  }));

t.create('downloads for specific asset without slash')
  .get('/downloads/atom/atom/v0.190.0/atom-amd64.deb.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('downloads'),
    value: Joi.not('none')
  }));

t.create('downloads for release with slash')
  .get('/downloads/NHellFire/dban/stable/v2.2.8/total.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('downloads'),
    value: Joi.not('none')
  }));

t.create('downloads for specific asset with slash')
  .get('/downloads/NHellFire/dban/stable/v2.2.8/dban-2.2.8_i586.iso.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('downloads'),
    value: Joi.not('none')
  }));

t.create('downloads for unknown release')
  .get('/downloads/atom/atom/does-not-exist/total.json')
  .expectJSON({ name: 'downloads', value: 'none' });

t.create('File size')
  .get('/size/webcaetano/craft/build/craft.min.js.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('size'),
    value: Joi.string().regex(/^[0-9]*[.]?[0-9]+\s(B|kB|MB|GB|TB|PB|EB|ZB|YB)$/)
  }));

t.create('Followers')
  .get('/followers/webcaetano.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('followers'),
    value: Joi.string().regex(/^\w+$/)
  }));
