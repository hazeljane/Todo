function CircularText({ text, radius = 120, startAngle, endAngle, invert = false, rotateLetters = true }) {
  const characters = text.split("");
  const totalAngle = Math.abs(endAngle - startAngle);
  const degreeStep = totalAngle / (characters.length - 1);

  return (
    <div
      style={{
        position: "absolute",
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        top: 0,
        left: 0,
      }}
    >
      {characters.map((char, index) => {
        const angle =
          startAngle < endAngle
            ? startAngle + index * degreeStep
            : startAngle - index * degreeStep;

        const rad = (angle * Math.PI) / 180;
        const x = radius + radius * Math.cos(rad);
        const y = radius - radius * Math.sin(rad);

        const rotation = rotateLetters ? (invert ? angle + 270 : angle - 90) : 0;

        return (
          <span
            key={index}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              fontSize: "20px",
              fontFamily: "Georgia, serif",
              color: "#5a3e36",
              userSelect: "none"
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default CircularText;
