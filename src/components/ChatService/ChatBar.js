import { Button } from "@mui/material";

const ChatBar = (props) => {
  const {matches, handleUserChange} = props;
  const handleMatchChange = (user) => {
    handleUserChange(user);
  }

  return (
    <div className="chat__sidebar">
        <h2 className="chat__header">Matches</h2>
        <div className="chat__users">
            {matches.map(m => {
                return <Button onClick={() => handleMatchChange(m)} key={`${m.id}`}>{m.first_name} {m.last_name}</Button>;
            })}
        </div>
    </div>
  );
};

export default ChatBar;