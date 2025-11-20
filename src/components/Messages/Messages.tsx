import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CardTitle } from '..';
import MessageList from './MessageList';
import MessageItem from './MessageItem';

const Messages = () => {
	return (
		<Card>
			<Card.Body>
				<CardTitle
					containerClass="d-flex align-items-center justify-content-between mb-3"
					title="Messages"
					menuItems={[{ label: 'Settings' }, { label: 'Action' }]}
				/>
				<MessageList>
					<MessageItem>
			    		<p className="inbox-item-author">Tomaslau</p>
						<p className="inbox-item-text">I've finished it! See you so...</p>
						<p className="inbox-item-date">
							<Link to="" className="btn btn-sm btn-link text-info font-13">
								Reply
							</Link>
						</p>
					</MessageItem>
				</MessageList>
			</Card.Body>
		</Card>
	);
};

export default Messages;
