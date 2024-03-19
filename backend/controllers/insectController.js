const navigateInsects = (req, res) => {
    const { roomSize, insects } = req.body;
  
    const output = navigateInsectsLogic(roomSize, insects);
  
    res.json(output);
  };
  
  const navigateInsectsLogic = (roomSize, insects) => {
    const output = [];
  
    for (const insect of insects) {
      let x = insect.x;
      let y = insect.y;
      let heading = insect.heading;
  
      for (const command of insect.commands) {
        switch (command) {
          case 'L':
            heading = turnLeft(heading);
            break;
          case 'R':
            heading = turnRight(heading);
            break;
          case 'F':
            const newPosition = moveForward(x, y, heading, roomSize);
            x = newPosition.x;
            y = newPosition.y;
            break;
        }
      }
  
      output.push(`${x} ${y} ${heading}`);
    }
  
    return output;
  };
  
  const turnLeft = (heading) => {
    const headings = ['N', 'W', 'S', 'E'];
    const currentIndex = headings.indexOf(heading);
    const newIndex = (currentIndex - 1 + headings.length) % headings.length;
    return headings[newIndex];
  };
  
  const turnRight = (heading) => {
    const headings = ['N', 'W', 'S', 'E'];
    const currentIndex = headings.indexOf(heading);
    const newIndex = (currentIndex + 1) % headings.length;
    return headings[newIndex];
  };
  
  const moveForward = (x, y, heading, roomSize) => {
    const maxX = roomSize[0] - 1;
    const maxY = roomSize[1] - 1;
  
    switch (heading) {
      case 'N':
        y = Math.min(y + 1, maxY);
        break;
      case 'S':
        y = Math.max(y - 1, 0);
        break;
      case 'E':
        x = Math.min(x + 1, maxX);
        break;
      case 'W':
        x = Math.max(x - 1, 0);
        break;
    }
  
    return { x, y };
  };
  
  module.exports = {
    navigateInsects,
  };