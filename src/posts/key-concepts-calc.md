---
title: Key Concepts from Calculus I
published_at: 2025-03-25T15:57:15.572Z
snippet: Notes from Calculus I. These notes cover approximately the first third of the OpenStax Calculus Textbook
math: true
gfm: false
cc_licensed: true
---

## Precalculus

#### Difference of squares

```math
 x^2 - y^2 = (x + y)(x - y)
```

#### Sum of cubes

```math
 x^3 + y^3 = (x + y)(x^2 - xy + y^2)
```

#### Difference of cubes

```math
 x^3 - y^3 = (x - y)(x^2 + xy + y^2)
```

#### change of base formulas

```math
 \begin{gather*} log_a b = \frac{log_c a}{log_c b} \\ log_a b =
\frac{ln(a)}{ln(b)} \\ \\ a^b = c^{b \cdot log_c a} \\ a^b = e^{b \cdot ln(a)}
\end{gather*}
```

#### Factorial

Factorial Can be defined as multiplying the first n natural numbers, or
recursively as follows:

```math
 \begin{align*} 0! &= 1 \\ n! &= (n-1)! \cdot n \end{align*}
```

### Sigma Notation(Summation)

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

#### Sigma notation properties

```math
 \begin{align*} \sum_{i=1}^{n} c &= n \cdot c \\ \sum_{i=1}^{n} c \cdot a_{i}
&= c \cdot \sum_{i=1}^{n} a_{i} \\ \sum_{i=1}^{n} (a_{i} + b_{i}) &=
\sum_{i=1}^{n}a_{i}+\sum_{i=1}^{n}b_{i} \\ \sum_{i=1}^{n} a_{i} &=
\sum_{i=1}^{m} a_{i} + \sum_{i=m+1}^{n} a_{i} \end{align*}
```

#### Sums and powers of integers

```math
 \begin{align*} \sum_{i=1}^{n} i &= \frac{ n \cdot (n + 1) }{2} \\
\sum_{i=1}^{n} i^{2} &= \frac{ n \cdot (n + 1) \cdot (2n + 1) }{6}\\
\sum_{i=1}^{n} i^{3} &= \frac{ n^{2} \cdot (n + 1)^{2} }{4} \end{align*}
```

#### n choose r (AKA nCr or binomial coefficients)

```math
 {n \choose r} = \frac{n!}{r!(n-r)!}
```

#### Binomial theorem

```math
 (x+y)^n = \sum_{k=0}^n {n \choose k}x^{n-k}y^k
```

## Trig Identities

#### Side ratios (SohCahToa and ChoShaCao)

```math
 \begin{align*} sin\theta = \frac{opp}{hyp} &\quad\quad csc\theta =
\frac{hyp}{opp} \\\\ cos\theta = \frac{adj}{hyp} &\quad\quad sec\theta =
\frac{hyp}{adj} \\\\ tan\theta = \frac{opp}{adj} &\quad\quad cot\theta =
\frac{adj}{opp} \end{align*}
```

#### Pythagorean Identities

```math
 \begin{align*} sin^2 \theta + cos^2 \theta = 1 \\ tan^2 \theta + 1 = sec^2
\theta \\ 1 + cot^2 \theta = csc^2 \theta \end{align*}
```

#### Angle Sum formulas

```math
 \begin{align*} sin(\alpha + \beta) &= sin\, \alpha \cdot cos \, \beta + cos
\, \alpha \cdot sin \, \beta \\ cos(\alpha + \beta) &= cos\, \alpha \cdot cos\,
\beta - sin \, \alpha \cdot sin \, \beta \\ tan(\alpha + \beta) &= \frac{tan \,
\alpha + tan \, \beta}{1 - (tan\, \alpha \cdot tan\, \beta)} \end{align*}
```

#### Double Angle formulas

```math
 \begin{align*} sin(2 \theta) &= 2 \cdot sin \, \theta \cdot cos \, \theta \\
cos(2 \theta) &= sin^2 \theta - cos^2 \theta \\ &= 1 - 2 \cdot sin^2 \theta \\
&= cos^2 \theta - 1 \\ tan(2 \theta) &= \frac{2 tan \, \theta}{1 - tan^2 \theta}
\end{align*}
```

#### Power reduction formulas

```math
 \begin{align*} sin^2 \theta &= \frac{1 - cos(2 \cdot \theta)}{2} \\ cos^2
\theta &= \frac{1 + cos(2 \cdot \theta)}{2} \\ tan^2 \theta &= \frac{1 - cos(2
\cdot \theta)}{1 + cos(2 \cdot \theta)} \end{align*}
```

## Calculus

### Derivative as a limit

#### Difference quotient

```math
 f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}
```

#### Difference quotient with increment h

```math
 f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}
```

### Differentiation rules

#### Constant rule

```math
 \begin{align*} \text{Let } f(x) &= c \\ \\ f'(x) &= \lim_{h \to 0}
\frac{f(x+h) - f(x)}{h} \\ &= \lim_{h \to 0} \frac{c - c}{h} \\ &= \lim_{h \to
0} \frac{0}{h} \\ &= \lim_{h \to 0} 0 = 0 \end{align*}
```

#### Power rule

```math
 \begin{align*} \text{Let } f(x) &= x^n \\ f'(x) &= nx^{n-1} \end{align*}
```

#### Sum rule

```math
 \frac{d}{dx}(f(x) + g(x)) = \frac{d}{dx}f(x) + \frac{d}{dx} g(x)
```

#### Constant multiple rule

```math
 \frac{d}{dx} k f(x) = k \frac{d}{dx} f(x)
```

#### Product Rule

```math
 \frac{d}{dx} \left( f(x) \cdot g(x) \right) = \frac{d}{dx} f(x) \cdot g(x) +
f(x) \cdot \frac{d}{dx} g(x)
```

#### Quotient rule

```math
 \frac{d}{dx} \left( \frac{f(x)}{g(x)} \right) = \frac{\frac{d}{dx} f(x) \cdot
g(x) - f(x) \cdot \frac{d}{dx} g(x)}{(g(x))^2}
```

#### Chain Rule

```math
 \begin{align*} \text{Let } h(x) &= f(g(x)) \\ h'(x) &= f'(g(x)) \cdot g'(x)\\
\text{Or} \\ \frac{dy}{dx} &= \frac{dy}{du} \cdot \frac{du}{dx} \end{align*}
```

### Trig derivatives

```math
 \begin{aligned} \frac{d}{dx} sin x &= cos x & \frac{d}{dx} cos x &= -sin x
\\\\ \frac{d}{dx} tan x &= sec^2 x & \frac{d}{dx} cot x &= -csc^2 x \\\\
\frac{d}{dx} sec x &= sec x tan x & \frac{d}{dx} csc x &= -csc x cot x
\end{aligned}
```

### Inverse Function Theorem

Let $f(x)$ be a function that is both invertible and differentiable. Let
$f^{-1}(x)$ be the inverse of $f(x)$. For all $x$ satisfying $f'(f^{-1}(x)) \neq
0$

```math
 \frac{dy}{dx} = \frac{d}{dx}(f^-1(x)) = (f^{-1})'(x) =
\frac{1}{f'(f^{-1}(x))}
```

Alternatively, if $y = g(x)$ is the inverse of $f(x)$, then

```math
 g'(x) = \frac{1}{f'(g(x))}
```

### Inverse trig derivatives

- Inverse function theorem

```math
 (f^{-1})'(x) = \frac1{f'(f^{-1}(x))} \text{ whenever } f'() \neq 0 \text{
  and } f(x) \text{is differentiable.}
```

- Power rule with rational exponents

```math
 \frac{d}{dx}(x^{m/n}) = \frac{m}{n}x^{(m/n)-1}
```

- Derivative of inverse sine function

```math
 \frac{d}{dx}sin^{-1}x = \frac{1}{\sqrt{1 - x^2}}
```

- Derivative of inverse cosine function

```math
 \frac{d}{dx}cos^{-1}x = \frac{-1}{\sqrt{1 - x^2}}
```

- Derivative of inverse tangent function

```math
 \frac{d}{dx}tan^{-1}x = \frac{1}{1 + x^2}
```

- Derivative of inverse cotangent function

```math
 \frac{d}{dx}cot^{-1}x = \frac{-1}{1 + x^2}
```

- Derivative of inverse secant function

```math
 \frac{d}{dx}sec^{-1}x = \frac{1}{\sqrt{x^2 - 1}}
```

- Derivative of invers cosecant function

```math
 \frac{d}{dx}csc^{-1}x = \frac{-1}{1 + x^2}
```

### Implicit differentiation

To perform implicit differentiation on an equation that defines a function $y$
implicitly in terms of variable $x$ use the following steps:

1. Take the derivative of both sides of the equation. Keep in mind that $y$ is a
   function of $x$. Consequently, whereas $\frac{d}{dx} (sin x) = cos x$,
   $\frac{d}{dx} (sin y) = cos y \frac{dy}{dx}$ because we must use the chain
   rule to differentiate $sin y$ with respect to $x$.
2. Rewrite the equation so that all terms containing $\frac{dy}{dx}$ are on the
   left hand side and that all terms that don't contain $\frac{dy}{dx}$ are on
   the right.
3. Factor out $\frac{dy}{dx}$ on the left.
4. Solve for $\frac{dy}{dx}$ by dividing both sides of the eauation by an
   appropriate algebraic equation.

### Derivatives of exponential and log functions

```math
 \begin{gather*}

\frac{d}{dx} e^{g(x)} = e^{g(x)} \cdot g'(x) \\

\frac{d}{dx} ln(g(x)) = \frac{1}{g(x)} \cdot g'(x) \\

\frac{d}{dx} b^{g(x)} = b^{g(x)} \cdot g'(x) \cdot ln(b)\\

\frac{d}{dx} log_b g(x) = \frac{g'(x)}{g(x) \cdot ln(b)} \\

\end{gather*}
```

### Solving related rates

1. Assign symbols to all variables involved in the problem. Draw a figure if
   applicable.
2. State, in terms of the variables, the information that is given, and the rate
   to be determined.
3. Fine an equation relating the variables introduced in step 1.
4. Using the chain rule, differentiate bothe sides of the equation found in step
   3 with respect to the independent variable. This new equation will relate the
   derivatives.
5. Substitute all known values into the equation from Step 4, then solve for the
   unknown rate of change.

### Linear Approximation

$f(x)$ can be approximated around point $a$ with the following:

```math
 L(x) = f(a) + f'a(x) \cdot (x - a)
```

the differential for $y = f(x)$ can be written as:

```math
 dy = f'(x) \cdot dx
```

### Fermat's Theorem(Not his last one though)

If $f$ has a local extremum at $c$ and $f$ is differentiable at c, then $f'(c) =
0$.

### Rolle's Theorem

If a real valued function $f$ is continuous on a proper closed interval $[a, b]$
differentiable on open interval $(a, b)$ and $f(a) =f(b)$, then there exists at
least one point $c \in (a, b)$ in the open interval such that

```math
 f'(c) = 0
```

### Mean Value Theorem

Let $f$ be continuous over closed interval $[a, b]$ and differentiable over the
open interval $(a, b)$. There exists a point $c \in (a, b)$ such that

```math
 f'(c) = \frac{f(b) - f(a)}{b-a}
```

### Mean Value Corrollaries

#### Corollary 1

Let $f$ be differentible over interval $I$. If $f'(x) = 0$ for all $x \in I$,
then $f(x)$ is constant for all $x \in I$

#### Corollary 2

If $f$ and $g$ are differentiable over an interval $I$ and $f'(x) = g'(x)$ for
all $x \in I$ then $f(x) = g(x) = C$ for some constant $C$.

#### Corollary 3

Let $f$ be a differentiable function over interval $I$.

1. if $f'(x) > 0$ for all $x \in I$ then $f$ is increasing on that interval.
2. if $f'(x) < 0$ for all $x \in I$ then $f$ is decreasing on that interval.

### Limits at infinity

#### Limit at infinity

We say a function $f$ has a Limit at infinity if there exists a real number $L$
such that for all $\epsilon > 0$, there exists $N > 0$ such that

```math
 \left| f(x) - L \right| < \epsilon
```

for all $x > N$. In that case, we write

```math
 \lim_{x \to \infty} f(x) = L
```

#### Infinite Limit at infinity

We say a function $f$ has an infinite limit at infinity and write

$\lim_{x \to \infty} = \infty$ if for all $M > 0$, there exists an $N > 0$ such
that

```math
 f(x) > M
```

for all $x > N$

(See text chapter 4.6 for negitive infinities)

### L'Hôpital's rule

Suppose $f$ and $g$ are differentiable functions over an open interval
containing $a$, except possibly at $a$. if $\displaystyle \lim_{x \to a} f(x) =
0$ and $\displaystyle \lim_{x \to a} g(x) = 0$, then

```math
 \lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}
```

assuming the limit on the right exists or is $\infty$ or $-\infty$. This result
also holds if we are considering one sided limits, or if $a = \infty$ and
$-\infty$

### Newton's Method

To approximate a root of function $f(x)$, start with an initial estimate of the
root, $x_{0}$, then iteratively apply the following formula

```math
 x_{n+1} = x_{n} - \frac{f(x_{n})}{f'(x_{n})}
```

### Antiderivatives

#### Definition

A function $F$ is an antiderivative of the function $f$ if

```math
 F'(x) = f(x)
```

for all $x$ in the domain of $f$.

#### General Form

Let $F$ be an antiderivative of $f$ over an interval $I$. Then,

1. for each constant $C$, the function $F(x) + C$ is also an antiderivative of
   $f$ over $I$;
2. if $G$ is an antiderivative of $f$ over $I$, there is a constant $C$ for
   which $G(x) - F(x) + C$ over $I$

In other words, the most general form of the antiderivative of $f$ over $I$ is
$F(x) + C$

#### Definition

Given a function $f$, the indefinite integral of $f$, denoted

```math
 \int f(x) dx
```

is the most general antiderivative of $f$. If $F$ is an antiderivative of $f$,
then

```math
 \int f(x) dx = F(x) + C
```

The expression $f(x) + C$ is called the _integrand_ and the variable x is the
_variable of integration_

#### Rules for Indefinite Integrals

```math
 \begin{gather*} \int k \, dx = \int k x^0 dx = kx + C \\ \int x^n \, dx =
\frac{x^{n+1}}{n + 1} + C \text{ for } = \ne -1 \\ \int \frac{1}{x} \, dx = ln
\left| x \right | + C \\ \int e^x \, dx = e^x + C \\ \int cos(x) \, dx =
sin(x) + C \\ \int sin(x) \, dx = -cos(x) + C \\ \int sec^2(x) \, dx = tan(x) +
C \\ \int csc(x) \, cot(x) \, dx = -csc(x) + C \\ \int sec(x) \, tan(x) \, dx =
sec(x) + C \\ \int csc^2(x) \, dx = -cot(x) + C \\ \int \frac{1}{\sqrt{1 - x^2}}
= sin^{-1}(x) + C \\ \int \frac{1}{1 + x^2} dx = tan^{-1}(x) + C \\ \int
\frac{1}{x\sqrt{x^2 -1}} dx = sec^{-1} \left| x \right| + C \end{gather*}
```

### Properties of Indefinite Integrals

Let $F$ and $G$ be antiderivatives of $f$ and $g$, respectively, and let $k$ be
any real number.

#### Sums and Differences

```math
 \int (f(x) \pm g(x)) dx = F(x) \pm G(x) + C
```

#### Constant Multiples

```math
 \int k \cdot f(x) dx = k \cdot F(x) + C
```

#### Definition of Partitions

A set of points $P={x_i}$ for $i=0,1,2,…,n$ with $a=x_0 < x_1 < x_2 < ... < x_n
= b$, which divides the interval $[a, b]$ into subintervals of the form $[x_0,
x_1]$, $[x_1, x_2], ..., [x_{n-1}, x_n]$ is called a partition of $[a,b]$. If
the subintervals all have the same width, the set of points forms a regular
partition (or uniform partition ) of the interval $[a,b]$.

So, to create regular partitions on a closed interval, we start by selecting
evenly spaced points along $[a, b]$

```math
 x_{i} - x_{i-1} = \frac{b-a}{n} = \Delta x
```

And then index each boundary point between partitions.

```math
 x_i = x_0 + i \cdot \Delta x
```

#### Rule: Left-Endpoint approximation

On each subinterval $[x{i-1}, x_{i}]$ for $i...n$ construct a rectangle with
width $\Delta x$ and height equal to $f(x_{i -1})$, which is the function value
at the left endpoint of the subinterval. Then the area of the rectangle is
$f(x_{i-1}) \cdot \Delta x$. Adding the areas of all these rectangles, we get an
approximate value for $A$. We use the notation $L_{n}$ to denote that this is a
left-endpoint approximation of $A$ using $n$ subintervals.

```math
 A \approx L_{n} = f(x_0) \cdot \Delta x + f(x_1) \cdot \Delta x + ... +
f(x_{n-1}) \cdot \Delta x
```

or, in terms of sigma notation:

```math
 L_{n} =\sum_{i=1}^n f(x_{i-1}) \cdot \Delta x
```

#### Rule: Right-Endpoint approximation

repeat steps above, but this time set rectangle heights to be equal to $f(x_i)$.
Then the area of the rectangle is $f(x_i) \cdot \Delta x$. We use the notation
$R_{n}$ to denote that this is a right-endpoint approximation of $A$ using $n$
subintervals.

```math
 A \approx R_{n} = f(x_1) \cdot \Delta x + f(x_2) \cdot \Delta x + ... +
f(x_n) \cdot \Delta x
```

or, in terms of sigma notation:

```math
 R_{n} = \sum_{i=1}^n f(x_i) \cdot \Delta x
```

#### Riemann sum

Let $f(x)$ be defined on a closed interval $[a, b]$ and let $P$ be any partition
of $[a, b]$. Let $\Delta x_i$ be the width of each subinterval $[x_{i-1},
x_{i}]$ and for each $i$, let $x_i^*$ be any point in$[x_{i-1}, x_{i}]$. A
riemann sum is defined for $f(x)$ as

```math
 \sum_{i=1}^n f(x_i^*) \cdot \Delta x_i
```

#### Area under the Curve

Let $f(x)$ be a continuous, nonnegative function on an interval $[a, b]$, and
let $\sum_{i=1}^n f(x_i^*) \cdot \Delta x$ be a Riemann sum for $f(x)$ with a
regular partition $P$. Then, the area under the curve $y=f(x)$ on $[a,b]$ is
given by

```math
 A=\lim_{n→∞}\sum_{i=1}^nf(x^∗_i) \cdot \Delta x
```

If $f(x)$ is a function defined on an interval $[a,b]$, the definite integral of
$f$ from $a$ to $b$

is given by

```math
 \int_a^b f(x) dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \cdot \Delta x

```

provided the limit exists. If this limit exists, the function $f(x)$ is said to
be integrable on $[a,b]$, or is an integrable function.

#### Properties of the Definite Integral

```math
 \begin{align*} \int^a_a f(x)\,dx &= 0 \\ \int^a_b f(x)\,dx &=
−\int^b_af(x)\,dx \\ \int^b_a [f(x)+g(x)]\,dx &=
\int^b_af(x)\,dx+\int^b_ag(x)\,dx \\ \int^b_a c f(x)\,dx &= c \int^b_a f(x)\,dx
\text{, for constant }c \\ \int^b_af(x)\,dx & =\int^c_af(x)\,dx+\int^b_cf(x)\,dx
\end{align*}
```

#### Average Value of a Function

Let $f(x) $ be continuous over the interval $[a, b]$. Then the average

```math
 f_{ave} = \frac{1}{b - a} \int_b^a f(x) dx
```

### The Fundamental Theorem of Calculus, Part 1

If $f(x)$ is continuous over an interval $[a, b]$, and the function $F(x)$ is
defined by

```math
 F(x) = \int_a^x f(t) dt
```

then $F'(x) = f(x)$ over $[a, b]$

### The Fundamental Theorem of Calculus, Part 2

If $f$ is continuous over the interval $[a, b]$ and $F(x)$ is any antiderivative
of $f(x)$ then

```math
 \int_a^b f(x) dx = F(b) - F(a)
```

#### Subtitution for indefinite integrals

Let $u = g(x)$ where $g'(x)$ is continuous over an interval, let $f(x)$ be
continuous over the corresponding range, of $g$, and let $F(x)$ be an
antiderivative of $f(x)$. Then,

```math
 \begin{align*} \int f(g(x)) g'(x) dx &= \int f(u) du \\ &= F(u) + C \\ &=
F(g(x)) + C \end{align*}
```

#### Substitution for indefinite integrals

Let $u = g(x)$ where $g'(x)$ is continuous over an interval $[a, b]$, and let
$f(x)$ be continuous over the corresponding range of $u = g(x)$. Then,

```math
 \int_a^b f(g(x)) g'(x) dx = \int_{g(a)}^{g(b)} f(u) du
```

#### Integrals of Exponential Functions

```math
 \begin{gather*} \int e^x dx = e^x + C \\ \int a^x dx = \frac{a^x}{ln(a)} + C
\end{gather*}
```

#### Integral formulas involving logs

```math
 \begin{gather*} \int x^{-1} dx = ln \left| x \right| + C \\ \int ln(x) dx = x
\cdot ln(x) - x + C = x(ln(x) - 1) + C \\ \int log_{a}(x) dx =
\frac{x}{ln(a)}(ln(x) - 1) + C \end{gather*}
```

#### Integral formulas resulting in inverse trig functions

```math
 \begin{gather*} \int \frac{du}{\sqrt{a^2 - u^2}} = sin^{-1} \left(
\frac{u}{a} \right) + C \\ \int \frac{du}{a^2 + u^2} = \frac{1}{a} tan^{-1}
\left( \frac{u}{a} \right) + C \\ \int \frac{du}{u\cdot{}\sqrt{a^2 - u^2}} =
\frac{1}{a} sec^{-1} \left( \frac{|u|}{a} \right) + C \end{gather*}
```

### Integration by parts

```math
 \int f(x) g'(x) dx = f(x) g(x) - \int g(x) f'(x) dx
```

or, if u = f(x) and v = g(x)

```math
 \int u \, dv = u \cdot v - \int v \, du
```

#### Choosing $u$ and $dv$

$u$ can be chosen by selecting the first type of function appearing in the
expression which appears in the LIATE

- Logarithmic functions
- Inverse Trig functions
- Algebraic functions
- Trig functions
- Exponential functions

#### Integration by parts for definite integrals

Let $u = f(x)$ and $v = g(x)$ be functions with continuous derivatives on $[a,
b]$. Then

```math
 \int_a^b u \, dv = (u \cdot v)\big|_a^b - \int_a^b v \, du
```

### Applications of Integrals

#### Finding the area between two curves

Let $f(x)$ and $g(x)$ be continuous functions such that $f(x) \geq g(x)$ over an
interval $[a, b]$. Let $R$ denote the region bounded above by the graph of
$f(x)$, below the graph of $g(x)$, and on the left and right by lines $x = a$
and $x = b$, respectively. Then the area of $R$ is given by

```math
 A = \int_a^b [f(x) - g(x)] dx
```

#### Integral Definition of natural logarithm

for $x > 0$, we define the natural logarithm by

```math
 ln(x) = \int_1^x \frac{1}{t}dt
```

#### Derivative of the Natural Logarithm

For $x > 0$, the derivative of the natural logarithm is given by

```math
 \frac{d}{dx} \big( ln(x) \big) = \frac{1}{x}
```

### Differential equations

A **differential equation** is an equation involving an unknown function $y =
f(x)$ and one or more of its derivatives. A solution to a differential equation
is a function $y = f(x)$ that satisfies the differential equation when $f$ and
its derivatives are substituted into the equation.

the **order of a differential equation** is the highest order of any derivative
of the unknown function that appears in the equation.

A **separable differential** equation is any equation that can be written in the
form $y' = f(x)g(y)$


-------------------------------------------------------------------------------
These notes are based on the [OpenStax Calculus Textbook](https://openstax.org/details/books/calculus-volume-1)
