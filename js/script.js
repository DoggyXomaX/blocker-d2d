const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;

const app = {
  blockOptions: {
    width: 56,
    height: 64,
    typeCount: 7,
  },
  world: {
    offset: {
      x: SCREEN_WIDTH * 0.5,
      y: SCREEN_WIDTH * 0.5,
    },
  },
  blocks: {
    data: [],
    count: { x: 16, y: 16, z: 16 },
  },
  parentElement: null,
};

app.CreateParentElement = () => {
  const parentElement = document.createElement('div');
  document.body.appendChild(parentElement);
  return parentElement;
};

app.CreateBlock = (parent) => {
  const { width, height, background } = app.blockOptions;
  const block = {
    position: { x: 0, y: 0, z: 0 },
    width, height,
    element: null,
  };

  const element = document.createElement('div');
  element.classList.add('block');
  parent.appendChild(element);
  block.element = element;

  block.SetBlock = function(i) {
    const { typeCount } = app.blockOptions;
    if (i < 0)
      i = 0;
    else if (i >= typeCount)
      i = typeCount - 1;

    const { width, element } = this;
    const x = -i * width;
    element.style.backgroundPosition = `${x}px 0px`;
  };

  block.SetPosition = function(x, y, z) {
    this.position = { x, y, z };
    
    const { offset } = app.world;
    const { width, element, height } = this;
    const ox = offset.x + (x - y) * width * 0.5;
    const oy = offset.y + (x + y - 2 * z) * height * 0.25;
    const zIndex = x + y + z;
    const opacity = ( x + y + z ) / ( 12 + 12 + 12 );
    element.style.left = `${ox}px`;
    element.style.top = `${oy}px`;
    element.style.zIndex = zIndex;
    element.style.opacity = opacity;
  };

  return block;
};

app.SetBlock = (x, y, z, i) => {
  const { x: cx, y: cy, z: cz } = app.blocks.count;
  const { typeCount } = app.blockOptions;

  const isOutOfRange = (
    (x < 0 || y < 0 || z < 0) || 
    (x >= cx || y >= cy || z >= cz) || 
    (i < 0 || i >= typeCount)
  );

  if (isOutOfRange) {
    console.log('Index is out of range!');
    return;
  }
  
  const targetIndex = (z * cy * cx) + (y * cx) + x;
  app.blocks.data[targetIndex].SetBlock(i);
};

app.Start = () => {
  app.parentElement = app.CreateParentElement();

  const { x: cx, y: cy, z: cz } = app.blocks.count;
  app.blocks.data = new Array(cx * cy * cz);

  for (let z = 0, i = 0; z < cz; z++) {
    for (let y = 0; y < cy; y++) {
      for (let x = 0; x < cx; x++, i++) {
        const block = app.CreateBlock(app.parentElement);
        block.SetBlock(0);
        block.SetPosition(x, y, z);
        app.blocks.data[i] = block;
      }
    }
  }

  for (let z = 0; z < cz; z++) {
    for (let y = 0; y < cy; y++) {
      for (let x = 0; x < cx; x++) {
        const dx = x - cx * 0.5;
        const dy = y - cy * 0.5;
        const dz = z - cz * 0.5;
        const avg = (cx + cy + cz) / 3 * 0.5;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        app.SetBlock(
          x, y, z, 
          (distance < avg ? 2 + Math.floor(Math.random() * 0) : 0)
        );
      }
    }
  }
};

window.onload = app.Start;

// TODO: Проверить сортировку блоков
// TODO: Перенести блоки на отдельный DIV
// TODO: Добавить отсечение невидимых блоков до изменения