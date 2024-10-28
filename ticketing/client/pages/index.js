import Link from 'next/link';
const LandingPage = ({ currentUser, tickets }) => {
  // return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
  const ticketList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    )
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>

    </div>
  )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const {data} = await client.get('/api/tickets');
   return {tickets: data};
};

export default LandingPage;
