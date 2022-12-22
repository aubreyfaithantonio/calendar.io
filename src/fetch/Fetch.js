const url = `${process.env.REACT_APP_API_URL}`

const allEvents = (sortFilter) => {
    return fetch(url + 'event?_sort=date&_order=asc' + sortFilter, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => {
        return result
      })
}

const manageEvent = (data) => {
    let actionUrl = data.action === "create" ? "" : "/" + data.id
    return fetch(url + 'event' + actionUrl, {
      method: data.action === "create" ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        date: data.date,
        status: data.status
      })
    })
      .then(response => response.json())
      .then(result => {
        return result  
      })
}

const getEvent = (eventId) => {
    return fetch(url + 'event/' + eventId, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => {
        return result
      })
}

const deleteEvent = (eventId) => {
    return fetch(url + 'event/' + eventId, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(result => {
        return result
    })
}

  export { allEvents, manageEvent, getEvent, deleteEvent }