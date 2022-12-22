import { useContext, useEffect, useState } from "react";
import { Container, Form, Button} from "react-bootstrap";
import "../css/Form.css"
import { manageEvent, getEvent, deleteEvent } from "../fetch/Fetch";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import DateContext from "../DateContext";

export default function Create() {

    const navigate = useNavigate()
    const {event_id} = useParams()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [status, setStatus] = useState("pending")
    const {currentDate} = useContext(DateContext)

    function manageForm(event) {
        event.preventDefault()
        
        let data = {
            name: name,
            description: description,
            date: date,
            status: (date === currentDate && event_id === 'create') ? 'ongoing' : status,
            action: event_id === "create" ? "create": "update",
            id: event_id === "create" ? "": event_id
        }
      
        manageEvent(data).then((result) => {
            Swal.fire({
                icon: 'success',
                title: event_id === "create" ? "Event saved": "Event updated",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate('/')
            })
        })
      }

      const removeEvent = (event_id) => {
		deleteEvent(event_id).then((result) => {
			Swal.fire({
                icon: 'success',
                title: 'Event deleted',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate('/')
            })
		})
	}

    useEffect(() => {
        if(event_id !== "create") {
            getEvent(event_id).then((result) => {
                if(Object.keys(result).length !== 0) {
                    setName(result.name)
                    setDescription(result.description)
                    setDate(result.date)
                    setStatus(result.status)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Event not found',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        navigate('/')
                    })
                }
            })
        }
	}, [])

    return(
        <>
            <Container className="create-container px-5">
                <Form onSubmit={event => manageForm(event)}>
                    <Form.Group className="mb-3" controlId="formEventName">
                        <Form.Label>Event</Form.Label>
                        <Form.Control autoComplete="off" type="text" placeholder="Enter event name" value={name}
                        onChange={event => setName(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEventDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter event description" value={description}
                        onChange={event => setDescription(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEventDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" value={date}
                        onChange={event => setDate(event.target.value)}/>
                    </Form.Group>

                    {event_id === "create" ? "" : 
                    <Form.Group className="mb-3" controlId="formEventStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Select name="status" value={status}
                        onChange={event => setStatus(event.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="ongoing">On-going</option>
                            <option value="done">Done</option>
                        </Form.Select>
                    </Form.Group>}

                    <Container className={event_id === "create" ? "button-container2": "button-container"}>
                        <Button className="create-button" type="submit" size="lg">
                        {event_id === "create" ? "Create new event": "Update"}
                        </Button>

                        {event_id === "create" ? "" : 
                        <Button className="delete-button" type="button" size="lg" onClick={() => removeEvent(event_id)}>
                            Delete
                        </Button>}
                    </Container>
                </Form>
            </Container>
        </>
    )
}