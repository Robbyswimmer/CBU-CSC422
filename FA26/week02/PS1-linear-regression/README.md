---
title: "PS1: Robby's Saturday"
description: "Seven short by-hand problems across the first three weeks"
---

# PS1: Robby's Saturday

**Covers weeks 1–3** · framing a task · least squares loss · gradient descent ·
perceptron · k-NN · naïve Bayes · k-means
**Due:** Wed 23 Sep 2026 · 11:59pm · 100 points

**[Download the problem set (PDF)](./PS1-Robbys-Saturday.pdf)** — also posted on Canvas.

> The LaTeX source is kept outside this repository because it carries the
> worked solutions inline.

## The day

Seven scenes from one Saturday. Each hands Robby a problem that an algorithm
from the first three weeks happens to solve.

| | scene | algorithm | pts |
|---|---|---|---|
| 1 | 7:04 a.m. — Robby makes a list | supervised vs unsupervised | 14 |
| 2 | 8:30 a.m. — Office hours, three weeks running | squared-error loss | 16 |
| 3 | 10:00 a.m. — The pool, and a bad learning rate | gradient descent | 16 |
| 4 | 11:15 a.m. — Sorting the new swimmers | perceptron | 14 |
| 5 | 1:30 p.m. — A fruit with no sticker | k-nearest neighbours | 14 |
| 6 | 4:00 p.m. — The inbox | naïve Bayes | 13 |
| 7 | 9:45 p.m. — Two tables | k-means | 13 |

## How it is built

Every problem opens with a **worked example** — one instance of exactly the step
the problem then asks for, done in full with different numbers. One problem per
page, with a figure wherever the idea can be seen rather than only computed.

No calculators and no code: every answer is an integer or a simple fraction.

## Lecture support

Audited 2026-09-09 against the week 1–3 decks and notebooks:

- Problems 1–3 and 5–6 are supported by `module_0`, `IC_2` and `IC_3`
- Problems 4 and 7 had **no** coverage, so
  `FA26/week03/materials/IC_3b_perceptron_kmeans.ipynb` was written to teach the
  perceptron and k-means (week 3, day 9). Its numbers differ from this pset's,
  but every calculation has the same shape
- Still uncovered: **feature scaling**, which problem 5(b) turns on. IC_3 teaches
  k-NN's "k closest, majority vote" but never mentions scaling

## Notes

Problem sets in this course are theory and short answer — derivations, small
worked examples, and reasoning. Show your work; a bare answer earns partial
credit at best.
