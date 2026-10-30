# 1237. Find Positive Integer Solution for a Given Equation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-positive-integer-solution-for-a-given-equation](https://leetcode.com/problems/find-positive-integer-solution-for-a-given-equation)
**Companies:** Google, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pointers — O(n) ✅](#4-approach-two-pointers--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a callable function `f(x, y)` **with a hidden formula** and a value `z`, reverse engineer the formula and return *all positive integer pairs *`x`* and *`y`* where *`f(x,y) == z`. You may return the pairs in any order.

While the exact formula is hidden, the function is monotonically increasing, i.e.:

- `f(x, y) < f(x + 1, y)`
- `f(x, y) < f(x, y + 1)`

The function interface is defined like this:

```
interface CustomFunction {
public:
  // Returns some positive integer f(x, y) for two positive integers x and y based on a formula.
  int f(int x, int y);
};
```

We will judge your solution as follows:

- The judge has a list of `9` hidden implementations of `CustomFunction`, along with a way to generate an **answer key** of all valid pairs for a specific `z`.
- The judge will receive two inputs: a `function_id` (to determine which implementation to test your code with), and the target `z`.
- The judge will call your `findSolution` and compare your results with the **answer key**.
- If your results match the **answer key**, your solution will be `Accepted`.

**Constraints:**
- `1 <= function_id <= 9`
- `1 <= z <= 100`
- It is guaranteed that the solutions of `f(x, y) == z` will be in the range `1 <= x, y <= 1000`.
- It is also guaranteed that `f(x, y)` will fit in 32 bit signed integer if `1 <= x, y <= 1000`.

---

## 2. Examples

**Example 1:**
```
Input: function_id = 1, z = 5
Output: [[1,4],[2,3],[3,2],[4,1]]
Explanation: The hidden formula for function_id = 1 is f(x, y) = x + y.
The following positive integer values of x and y make f(x, y) equal to 5:
x=1, y=4 -> f(1, 4) = 1 + 4 = 5.
x=2, y=3 -> f(2, 3) = 2 + 3 = 5.
x=3, y=2 -> f(3, 2) = 3 + 2 = 5.
x=4, y=1 -> f(4, 1) = 4 + 1 = 5.
```

**Example 2:**
```
Input: function_id = 2, z = 5
Output: [[1,5],[5,1]]
Explanation: The hidden formula for function_id = 2 is f(x, y) = x * y.
The following positive integer values of x and y make f(x, y) equal to 5:
x=1, y=5 -> f(1, 5) = 1 * 5 = 5.
x=5, y=1 -> f(5, 1) = 5 * 1 = 5.
```

---

## 3. Key Insight

> Since `f` is monotonically increasing in both arguments, use **two pointers**: start with `x = 1, y = 1000`. If `f(x,y) < z`, increase `x`. If `f(x,y) > z`, decrease `y`. If equal, record and move both pointers.

This is analogous to searching a sorted 2D matrix.

---

## 4. Approach: Two Pointers — O(n) ✅

```
FUNCTION findSolution(f, z):
    result ← []
    x ← 1
    y ← 1000

    WHILE x <= 1000 AND y >= 1 DO
        val ← f(x, y)
        IF val == z THEN
            result.ADD([x, y])
            x ← x + 1
            y ← y - 1
        ELSE IF val < z THEN
            x ← x + 1
        ELSE
            y ← y - 1

    RETURN result
```

---

## 5. Walkthrough

```
f(x,y) = x + y, z = 5

x=1, y=1000: f=1001 > 5  → y=999
...  (y keeps decreasing)
x=1, y=5:    f=6 > 5     → y=4
x=1, y=4:    f=5 == 5    → record [1,4], x=2, y=3
x=2, y=3:    f=5 == 5    → record [2,3], x=3, y=2
x=3, y=2:    f=5 == 5    → record [3,2], x=4, y=1
x=4, y=1:    f=5 == 5    → record [4,1], x=5, y=0
y=0 → exit

Result: [[1,4],[2,3],[3,2],[4,1]] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) where n = 1000 — each pointer moves at most n times |
| **Space** | O(k) — output list with k pairs |

---

## 7. Follow-Up Questions

### 7.1 Why not binary search for each x?

You could binary search `y` for each `x` in O(n log n), but two pointers is simpler and O(n).

### 7.2 What if f is not monotonic?

Without monotonicity, you'd need brute force O(n²) to check all pairs.

### 7.3 How is this related to "search a 2D sorted matrix"?

The monotonic function creates a virtual 2D matrix where rows and columns are sorted. The two-pointer technique is identical to searching such a matrix from the top-right corner.

---

## 8. Key Takeaway

> When a function is **monotonically increasing in two variables**, treat it as a sorted 2D matrix and use the **top-right corner two-pointer technique** to find target values in O(n) time.
