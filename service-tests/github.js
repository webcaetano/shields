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
    value: Joi.string().regex(/^\w+$/)
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

t.create('GitHub closed issues')
  .get('/issues-closed/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('closed issues'),
    value: Joi.string().regex(/^\w+\+?\sclosed$/)
  }));

t.create('GitHub closed issues raw')
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

t.create('File size')
  .get('/size/webcaetano/craft/build/craft.min.js.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('size'),
    value: [
      Joi.string().regex(/^[0-9]*[.]?[0-9]+\s(B|kB|MB|GB|TB|PB|EB|ZB|YB)$/),
      Joi.string().regex(/^repo or file not found$/),
      Joi.string().regex(/^unknown file$/),
    ]
  }));

t.create('Followers')
  .get('/followers/webcaetano.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('followers'),
    value: Joi.string().regex(/^\w+$/)
  }));

t.create('Watchers')
  .get('/watchers/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('watchers'),
    value: Joi.number().integer().positive()
  }));

t.create('Stars')
  .get('/stars/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('stars'),
    value: Joi.string().regex(/^\w+$/)
  }));

t.create('Forks')
  .get('/forks/badges/shields.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('forks'),
    value: Joi.number().integer().positive()
  }));

t.create('Commits since')
  .get('/commits-since/badges/shields/a0663d8da53fb712472c02665e6ff7547ba945b7.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.string().regex(/^(commits since){1}[\s\S]+$/),
    value: Joi.string().regex(/^\w+$/)
  }));

t.create('Release')
  .get('/release/photonstorm/phaser.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('release'),
    value: Joi.string()
  }));

t.create('(pre-)Release')
  .get('/release/photonstorm/phaser/all.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('release'),
    value: Joi.string()
  }));

t.create('Tag')
  .get('/tag/photonstorm/phaser.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('tag'),
    value: Joi.string()
  }));

t.create('Downloads all releases')
  .get('/downloads/photonstorm/phaser/total.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('downloads'),
    value: Joi.string().regex(/^\w+\s+total$/)
  }));

t.create('Downloads latest release')
  .get('/downloads/photonstorm/phaser/latest/total.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('downloads'),
    value: Joi.string().regex(/^\w+$/)
  }));

t.create('Downloads for specific asset')
  .get('/downloads/atom/atom/v0.190.0/atom-amd64.deb.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('downloads'),
    value: [
      Joi.string().regex(/^\w+\s+([\s\S]+)?\s+\[[\s\S]+]$/),
      Joi.string().regex(/^none$/)
    ]
  }));

t.create('Downloads for release without slash')
  .get('/downloads/atom/atom/v0.190.0/total.json')
  .expectJSONTypes(Joi.object().keys({
    name: Joi.equal('downloads'),
    value: [Joi.string().regex(/^none$/),Joi.string().regex(/^\w+\s+[\s\S]+$/)]
  }));

t.create('downloads for unknown release')
  .get('/downloads/NHellFire/dba/does-not-exist/total.json')
  .expectJSON({ name: 'downloads', value: 'none' });
