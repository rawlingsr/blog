---
title: Key Concepts from Calculus I, Second Half
published_at: 2025-04-11T19:02:02.132Z
snippet: Notes from Calculus I. I created these notes to help get me through Calculus I. My notes end somewhere around the end of Volume 1 of the OpenStax Textbook, because that's all we used in class.
math: true
gfm: false
cc_licensed: true
---

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
