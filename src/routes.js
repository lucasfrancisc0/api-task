import { randomUUID } from 'node:crypto';

import { buildRoutePath } from './utils/build-route-path.js';
import { Database } from  './database.js';

const database = new Database();

export const routes = [

  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)

      return res.end(JSON.stringify(tasks))

    }
  },

  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if(!title){
        res.writeHead(400).end(
          JSON.stringify({ message: 'title is required'})
        )
      }

      if(!description){
        res.writeHead(400).end(
          JSON.stringify({ message: 'description is required'})
        )
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      database.insert('tasks', task)

      return res.writeHead(201).end('Task Created')
    }
  },
];