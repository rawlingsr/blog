---
title: Key Concepts from Calculus I, Prereqs
published_at: 2025-03-25T15:57:15.572Z
snippet: These notes cover approximately what you'll need to review going into Calculus, if you're in a course that uses this textbook. Some of this may be covered in Chapter 1.
math: true
gfm: false
cc_licensed: true
---

# Precalculus

## Difference of squares

```math
 x^2 - y^2 = (x + y)(x - y)
```

## Sum of cubes

```math
 x^3 + y^3 = (x + y)(x^2 - xy + y^2)
```

## Difference of cubes

```math
 x^3 - y^3 = (x - y)(x^2 + xy + y^2)
```

## change of base formulas

```math
 \begin{gather*} log_a b = \frac{log_c a}{log_c b} \\ log_a b =
\frac{ln(a)}{ln(b)} \\ \\ a^b = c^{b \cdot log_c a} \\ a^b = e^{b \cdot ln(a)}
\end{gather*}
```

## Factorial

Factorial Can be defined as multiplying the first n natural numbers, or
recursively as follows:

```math
 \begin{align*} 0! &= 1 \\ n! &= (n-1)! \cdot n \end{align*}
```

## Sigma Notation(Summation)

Adding up the first 10 natural numbers

```math
 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10
```

can be rewritten as $\sum_{i=1}^{10} i$

the index variable, $i$ here, can be part of an expression, or it can be used as
just an index, as with the following

```math
 \sum_{i=1}^{10} s_{i}
```

In this example, $i$ has no real meaning, other than to help $s_{i}$ stand for
$s_{1}, s_{2}, s_{3}$ etc.

## Sigma notation properties

```math
 \begin{align*} \sum_{i=1}^{n} c &= n \cdot c \\ \sum_{i=1}^{n} c \cdot a_{i}
&= c \cdot \sum_{i=1}^{n} a_{i} \\ \sum_{i=1}^{n} (a_{i} + b_{i}) &=
\sum_{i=1}^{n}a_{i}+\sum_{i=1}^{n}b_{i} \\ \sum_{i=1}^{n} a_{i} &=
\sum_{i=1}^{m} a_{i} + \sum_{i=m+1}^{n} a_{i} \end{align*}
```

## Sums and powers of integers

```math
 \begin{align*} \sum_{i=1}^{n} i &= \frac{ n \cdot (n + 1) }{2} \\
\sum_{i=1}^{n} i^{2} &= \frac{ n \cdot (n + 1) \cdot (2n + 1) }{6}\\
\sum_{i=1}^{n} i^{3} &= \frac{ n^{2} \cdot (n + 1)^{2} }{4} \end{align*}
```

## n choose r (AKA nCr or binomial coefficients)

```math
 {n \choose r} = \frac{n!}{r!(n-r)!}
```

## Binomial theorem

```math
 (x+y)^n = \sum_{k=0}^n {n \choose k}x^{n-k}y^k
```

## Trig Identities

### Side ratios (SohCahToa and ChoShaCao)

```math
 \begin{align*} sin\theta = \frac{opp}{hyp} &\quad\quad csc\theta =
\frac{hyp}{opp} \\\\ cos\theta = \frac{adj}{hyp} &\quad\quad sec\theta =
\frac{hyp}{adj} \\\\ tan\theta = \frac{opp}{adj} &\quad\quad cot\theta =
\frac{adj}{opp} \end{align*}
```

### Pythagorean Identities

```math
 \begin{align*} sin^2 \theta + cos^2 \theta = 1 \\ tan^2 \theta + 1 = sec^2
\theta \\ 1 + cot^2 \theta = csc^2 \theta \end{align*}
```

### Angle Sum formulas

```math
 \begin{align*} sin(\alpha + \beta) &= sin\, \alpha \cdot cos \, \beta + cos
\, \alpha \cdot sin \, \beta \\ cos(\alpha + \beta) &= cos\, \alpha \cdot cos\,
\beta - sin \, \alpha \cdot sin \, \beta \\ tan(\alpha + \beta) &= \frac{tan \,
\alpha + tan \, \beta}{1 - (tan\, \alpha \cdot tan\, \beta)} \end{align*}
```

### Double Angle formulas

```math
 \begin{align*} sin(2 \theta) &= 2 \cdot sin \, \theta \cdot cos \, \theta \\
cos(2 \theta) &= sin^2 \theta - cos^2 \theta \\ &= 1 - 2 \cdot sin^2 \theta \\
&= cos^2 \theta - 1 \\ tan(2 \theta) &= \frac{2 tan \, \theta}{1 - tan^2 \theta}
\end{align*}
```

### Power reduction formulas

```math
 \begin{align*} sin^2 \theta &= \frac{1 - cos(2 \cdot \theta)}{2} \\ cos^2
\theta &= \frac{1 + cos(2 \cdot \theta)}{2} \\ tan^2 \theta &= \frac{1 - cos(2
\cdot \theta)}{1 + cos(2 \cdot \theta)} \end{align*}
```
