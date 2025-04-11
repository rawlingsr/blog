---
title: Key Concepts from Calculus I, First Half
published_at: 2025-04-11T19:01:54.040Z
snippet: Notes from Calculus I. I created these notes to help get me through Calculus I. My notes end somewhere around the end of Volume 1 of the OpenStax Textbook, because that's all we used in class.
math: true
gfm: false
cc_licensed: true
---

# Calculus

## Derivative as a limit

### Difference quotient

```math
 f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}
```

### Difference quotient with increment h

```math
 f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}
```

## Differentiation rules

### Constant rule

```math
 \begin{align*} \text{Let } f(x) &= c \\ \\ f'(x) &= \lim_{h \to 0}
\frac{f(x+h) - f(x)}{h} \\ &= \lim_{h \to 0} \frac{c - c}{h} \\ &= \lim_{h \to
0} \frac{0}{h} \\ &= \lim_{h \to 0} 0 = 0 \end{align*}
```

### Power rule

```math
 \begin{align*} \text{Let } f(x) &= x^n \\ f'(x) &= nx^{n-1} \end{align*}
```

### Sum rule

```math
 \frac{d}{dx}(f(x) + g(x)) = \frac{d}{dx}f(x) + \frac{d}{dx} g(x)
```

### Constant multiple rule

```math
 \frac{d}{dx} k f(x) = k \frac{d}{dx} f(x)
```

### Product Rule

```math
 \frac{d}{dx} \left( f(x) \cdot g(x) \right) = \frac{d}{dx} f(x) \cdot g(x) +
f(x) \cdot \frac{d}{dx} g(x)
```

### Quotient rule

```math
 \frac{d}{dx} \left( \frac{f(x)}{g(x)} \right) = \frac{\frac{d}{dx} f(x) \cdot
g(x) - f(x) \cdot \frac{d}{dx} g(x)}{(g(x))^2}
```

### Chain Rule

```math
 \begin{align*} \text{Let } h(x) &= f(g(x)) \\ h'(x) &= f'(g(x)) \cdot g'(x)\\
\text{Or} \\ \frac{dy}{dx} &= \frac{dy}{du} \cdot \frac{du}{dx} \end{align*}
```

## Trig derivatives

```math
 \begin{aligned} \frac{d}{dx} sin x &= cos x & \frac{d}{dx} cos x &= -sin x
\\\\ \frac{d}{dx} tan x &= sec^2 x & \frac{d}{dx} cot x &= -csc^2 x \\\\
\frac{d}{dx} sec x &= sec x tan x & \frac{d}{dx} csc x &= -csc x cot x
\end{aligned}
```

## Inverse Function Theorem

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

## Inverse trig derivatives

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

-------------------------------------------------------------------------------
These notes are based on the [OpenStax Calculus Textbook](https://openstax.org/details/books/calculus-volume-1)
