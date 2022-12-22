import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Image, Form, Card } from "react-bootstrap";
import {Link} from "react-router-dom";
import "../css/Home.css"
import { allEvents } from "../fetch/Fetch";

export default function Home(){

    const [events, setEvents] = useState([])
    const [status, setStatus] = useState("all")

    useEffect(() => {
        let sortFilter = status === 'all' ? '' : '&status=' + status
		allEvents(sortFilter).then(result => {
			setEvents(result)
		})
	},[status])

    return(
        <>
            <Container className="fixed">
                <Row className="buttons">
                    <Col className="new col-6">
                        <Button className="new-button my-3" size="lg" as={Link} to="/form/create">
                            Create event
                        </Button>
                    </Col>

                    <Col className="filter col-6">
                        <Form.Group className="mb-3" controlId="formEventStatus">
                            <Form.Label><strong>Status</strong></Form.Label>
                            <Form.Select name="status" value={status}
                            onChange={event => setStatus(event.target.value)}>
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="done">Done</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <Container className="main flex">
                {events.map((event , key) => (
                    <Row className="my-2 mx-3" key={key}>
                        <Button variant="primary" size="lg" className={event.status === "pending" ? "event-pending" : "event-done"} as={Link} to={"/form/" + event.id}>
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