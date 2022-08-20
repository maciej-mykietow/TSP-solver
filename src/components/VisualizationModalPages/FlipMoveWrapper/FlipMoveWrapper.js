import FlipMove from "react-flip-move";

const FlipMoveWrapper = (props) => {
  return (
    <FlipMove
      staggerDurationBy="20"
      duration={props.duration ? props.duration : 2000}
      enterAnimation={"elevator"}
      leaveAnimation={"elevator"}
      typeName="ul"
      style={{
        display: "flex",
        paddingInlineStart: "10px",
        flexWrap: "wrap",
        ...props.style,
      }}
    >
      {/* solution or solutions (tournament) */}
      {props.children}
    </FlipMove>
  );
};

export default FlipMoveWrapper;
