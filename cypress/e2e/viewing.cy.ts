interface MakeHeadingProps {
  text?: string;
}

function makeHeading({ text }: MakeHeadingProps) {
  return {
    type: "tag",
    tag: "h1",
    children: [
      {
        type: "text",
        text,
      },
    ],
  };
}

interface MakeParagraphProps {
  text?: string;
}

function makeParagraph({ text }: MakeHeadingProps) {
  return {
    type: "tag",
    tag: "p",
    children: [
      {
        type: "text",
        text,
      },
    ],
  };
}

interface MakeDivProps {
  children: Array<unknown>;
}

function makeDiv({ children }: MakeDivProps) {
  return {
    type: "tag",
    tag: "div",
    children: children,
  };
}

function setPageContent(elements: unknown[]) {
  cy.window().invoke("setPageContent", elements);
}

describe("empty spec", () => {
  it("displays a heading", () => {
    cy.visit("/");

    const headingText = "Example Heading";
    const heading = makeHeading({
      text: headingText,
    });
    setPageContent([heading]);

    cy.contains(headingText).parents().find("h1").should("exist");
  });

  it("displays a paragraph", () => {
    cy.visit("/");

    const paragraphText = "Paragraph Text";
    const paragraph = makeParagraph({
      text: paragraphText,
    });
    setPageContent([paragraph]);

    cy.contains(paragraphText).parents().find("p").should("exist");
  });

  it("displays a div with children", () => {
    cy.visit("/");

    const paragraphText = "Unique Paragraph Name";
    setPageContent([
      makeDiv({
        children: [makeParagraph({ text: paragraphText })],
      }),
    ]);

    cy.get("div > p").should("contain.text", paragraphText);
  });

  it("displays multiple elements", () => {
    cy.visit("/");

    const paragraphText = "Testing Paragraph Content";
    const headingText = "Testing Heading Content";

    setPageContent([
      makeParagraph({ text: paragraphText }),
      makeHeading({ text: headingText }),
    ]);

    const paragraph = cy.contains(paragraphText).parents().find("p");
    const heading = paragraph.next();
    heading.should("contain.text", headingText);
  });
});
