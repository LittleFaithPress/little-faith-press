export type Testimonial = {
  title: string;
  body: string;
  rating: number;
  author?: string;
};

export const testimonials: Testimonial[] = [
  {
    title: "Big Hit",
    body:
      "I got this for my 3-year-old daughter and it’s been a big hit. The pages are simple, cute, and really well designed for little kids. The lines are bold and clear, so she can color without getting frustrated, and there’s plenty of open space for her to do her thing. Printing at home was easy, and I like that we can reprint pages she really likes. It’s been perfect for a quiet afternoon activity and a fun way to get her excited about Valentine’s Day. If you’re a parent looking for something age-appropriate that actually keeps your toddler engaged, this is a solid choice. Definitely worth it.",
    rating: 5,
    author: "Parent of a 3-year-old",
  },
  {
    title: "Simple Bible Stories",
    body:
      "I bought this for my daughter and it’s been perfect for our coloring time. Each Bible story is broken into three simple coloring pages, which makes it easy for little kids to stay focused without getting overwhelmed. I really like that each page has a short prompt, so it gives me something simple to talk about while we color together. Clean lines, no clutter, and very kid-friendly. Great buy for families.",
    rating: 5,
    author: "Parent of a 3-year-old",
  },
  {
    title: "Calm and simple",
    body:
      "Bought this Easter coloring book for my 3-year-old daughter and it worked out great. The designs are easy for her to follow, the lines are thick, and nothing feels too busy. It printed cleanly and will be a nice go-to activity during the Easter season.",
    rating: 5,
    author: "Parent review",
  },
];