import blessed, { createScreen } from "npm:blessed@0.1.81";

const screen = createScreen({
  smartCSR: true,
});

screen.title = "my window title";

const box = blessed.box({
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content: "Hello {bold}world{/bold}!",
  tags: true,
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "magenta",
    border: {
      fg: "#f0f0f0",
    },
    hover: {
      bg: "green",
    },
  },
});

screen.append(box);

box.on("click", function (data) {
  box.setContent("{center}Some different {red-fg}content{/red-fg}.{/center}");
  screen.render();
});

box.key("enter", function (ch, key) {
  box.setContent(
    "{right}Even different {black-fg}content{/black-fg}.{/right}\n"
  );
  box.setLine(1, "bar");
  box.insertLine(1, "foo");
  screen.render();
});

screen.key(["escape", "q", "C-c"], function (ch, key) {
  return Deno.exit(0);
});

box.focus();
// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  screen.render();
}
