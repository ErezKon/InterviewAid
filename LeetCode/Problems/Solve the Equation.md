# 640. Solve the Equation

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google
---

## Problem Description

Given a string equation like `"x+5-3+x=6+x-2"`, solve for `x`. Return `"x=value"`, `"Infinite solutions"`, or `"No solution"`.

### Examples

- **Input:** `"x+5-3+x=6+x-2"` → **Output:** `"x=2"`
- **Input:** `"x=x"` → **Output:** `"Infinite solutions"`
- **Input:** `"2x=x"` → **Output:** `"x=0"`

## Approach: Parse + Solve — O(n) ✅

**Key Insight:** Parse both sides, collect x coefficients and constants separately, then solve `ax = b`.

```
FUNCTION solveEquation(equation):
    FUNCTION parse(expr):
        coeff = 0; constant = 0
        // Split by +/- keeping signs, parse each token
        FOR each token in expr:
            IF token ends with 'x':
                coeff += coefficient value
            ELSE:
                constant += integer value
        RETURN (coeff, constant)

    left, right = equation.split('=')
    lc, ln = parse(left)
    rc, rn = parse(right)

    // lc*x + ln = rc*x + rn → (lc-rc)*x = rn - ln
    a = lc - rc
    b = rn - ln
    IF a == 0:
        RETURN "Infinite solutions" IF b == 0 ELSE "No solution"
    RETURN "x=" + str(b / a)
```

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |
