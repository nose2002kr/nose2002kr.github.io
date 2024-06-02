import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get(process.env.REACT_APP_BASE_API_URL+'/video', ()=>{
    return HttpResponse.json([
      {
        "project_name": "Screen Translator",
        "video_link": "https://www.youtube.com/embed/MqelFFLfUuU",
        "description": "헤헤"
      }
    ])
  }),

  http.get(process.env.REACT_APP_BASE_API_URL+'/servers', ()=>{
    return HttpResponse.json([
      {
        "server_name": "Heroku",
        "survival_check": "https://nose2002kr-87260d56b9d8.herokuapp.com/docs",
      },{
        "server_name": "Dead Server",
        "survival_check": "https://nose2002kr-87260d56b9d8.herokuapp.com",
      }
    ])
  }),

  http.get(process.env.REACT_APP_BASE_API_URL+'/server/server1', ()=>{
    return HttpResponse.json([
      {
        "prompt": "not ready",
        "turn_off": "not ready",
        "turn_on": "not ready"
      }
    ])
  }),

  http.get(process.env.REACT_APP_BASE_API_URL+'/server/server2', ()=>{
    return HttpResponse.json([
      {
        "prompt": "not ready",
        "turn_off": "not ready",
        "turn_on": "not ready"
      }
    ])
  }),
]
