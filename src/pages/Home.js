import { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Col, Image, Form, Card } from "react-bootstrap";
import {Link} from "react-router-dom";
import "../css/Home.css"
import DateContext from "../DateContext";
import { allEvents } from "../fetch/Fetch";

export default function Home(){

    const [events, setEvents] = useState([])
    const [status, setStatus] = useState("all")
    const [name, setName] = useState("")
    const {currentDate} = useContext(DateContext)

    const eventClass = (status) => {
        if(status === 'ongoing') {
            return 'event-ongoing'
        } else if (status === 'done') {
            return 'event-done'
        } else {
            return 'event-pending'
        }
    }

    useEffect(() => {
        let sortFilter = status === 'all' ? '' : '&status=' + status
        let searchFilter = name === '' ? '' : '&name_like=' + name
		allEvents(sortFilter + searchFilter).then(result => {
			setEvents(result)
		})
	},[status, name])

    return(
        <>
            <Container className="spacing"></Container>
            <Container className="main main-action fixed">
                <Row className="buttons">
                    <Col className="new">
                        <Button className="new-button my-3" as={Link} to="/form/create">
                            Create event
                        </Button>
                    </Col>
                </Row>
                <Row className="filter-container">
                    <Col className="filter col-6">
                        <Form.Group className="mb-3" controlId="formEventStatus">
                            <Form.Label><strong>Status</strong></Form.Label>
                            <Form.Select name="status" value={status}
                            onChange={event => setStatus(event.target.value)}>
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="ongoing">On-going</option>
                                <option value="done">Done</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col className="filter col-6">
                        <Form.Group className="mb-3" controlId="formEventSearch">
                            <Form.Label><strong>Search</strong></Form.Label>
                            <Form.Control type="text" placeholder="Search event name" value={name}
                            onChange={event => setName(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <Container className="main main-data flex">
                {events.map((event , key) => (
                    <Row className="my-2 mx-3" key={key}>
                        <Button variant="primary" size="lg" className={eventClass(event.status)} as={Link} to={"/form/" + event.id}>
                            <Container>{event.name}</Container>
                            <Container>{event.date}</Container>
                        </Button>
                    </Row>
                ))}
                {(events.length === 0) ?
                    <Row className="my-2 mx-3">
                        <Card>
                            <Card.Body>
                            <Card.Text className="text-center">
                                 You have no events yet.
                            </Card.Text> 
                            </Card.Body>
                        </Card>
                    </Row>
                    :
                    ''
                }
            </Container>
        </>
    )
}