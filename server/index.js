const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const EventModel = require('./schemas');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// mongo
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

// endpoints
app.get('/', (req, res) => {
  res.json({ a: 'Working' });
})


app.get('/events', (req, res) => {
  EventModel.find({}, { __v: 0, user: 0 }, (err, events) => {
    if (err) {
      res.status(400).json({ message: 'Get event failed', err });
    } else {
      res.json({ message: 'Event retrieved successfully', events });
    }
  });
})

app.get('/events/:id', (req, res) => {
  
  EventModel.find({id:1}, (err, event) => {
    if (err) {
      res.status(400).json({ message: 'Get event failed', err });
    } else {
      res.json({ message: 'Event retrieved successfully', event });
    }
  });
})
app.post('/events', (req, res) => {
  

  console.log(req.body)

  req.body.user = req.user.id;

  const newEvent = EventModel(req.body);

  newEvent.save((err, savedEvent) => {
    if (err) {
      res.status(400).json({ message: 'Create event failed', err });
    } else {
      res.json({ message: 'Event created successfully', event: savedEvent });
    }
  });
})


app.put('/events/:id', (req, res) => {
  EventModel.findById(req.body.id, { __v: 0, user: 0 }, (err, event) => {
    if (err) {
      res.status(400).send({ message: 'Update event failed', err });
    } else {
      event.title = req.body.title;
      event.updated_at = Date.now();
      event.save((err, savedEvent) => {
        if (err) {
          res.status(400).send({ message: 'Update event failed', err });
        } else {
          res.send({ message: 'Updated event successfully', event: savedEvent });
        }
      });
    }
  });
});


app.delete('/events/:id', (req, res) => {
  EventModel.findByIdAndRemove(req.body.id, err => {
    if (err) {
      res.status(400).json({ message: 'Delete event failed', err });
    } else {
      res.json({ message: 'Event successfully deleted' });
    }
  });
});




