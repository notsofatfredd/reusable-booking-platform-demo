import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('contains configurable platform surfaces',async()=>{const s=await readFile(new URL('../app.js',import.meta.url),'utf8');for(const x of ['industryPacks','activeTenant','services','staff','customers','bookings','settings','admin','publicBooking'])assert.match(s,new RegExp(x))});
test('loads the application module',async()=>{const s=await readFile(new URL('../index.html',import.meta.url),'utf8');assert.match(s,/type="module" src="app.js"/);assert.match(s,/<meta name="viewport"/)});
