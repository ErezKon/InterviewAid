
# Local Minimum / Maximum Problem — Complete Interview Guide

---

## Table of Contents

- [1. Definition](#1-definition)
- [2. Why It Matters in Interviews](#2-why-it-matters-in-interviews)
- [3. The Key Insight](#3-the-key-insight)
- [4. Approach 1: Brute Force — O(n)](#4-approach-1-brute-force--on)
- [5. Approach 2: Binary Search — O(log n)](#5-approach-2-binary-search--olog-n)
  - [5.1 Algorithm](#51-algorithm)
  - [5.2 Pseudocode Implementation](#52-pseudocode-implementation)
- [6. Walkthrough Example](#6-walkthrough-example)
- [7. Complexity Analysis](#7-complexity-analysis)
- [8. Variations](#8-variations)
  - [8.1 Find a Peak Element (Local Max)](#81-find-a-peak-element-local-max)
  - [8.2 2D Peak Finding (Matrix)](#82-2d-peak-finding-matrix)
  - [8.3 Multiple Local Minima](#83-multiple-local-minima)
- [9. Common Interview Follow-Up Questions & Answers](#9-common-interview-follow-up-questions--answers)
  - [9.1 Why does binary search work on an unsorted array?](#91-why-does-binary-search-work-on-an-unsorted-array)
  - [9.2 Does this work with duplicates?](#92-does-this-work-with-duplicates)
  - [9.3 Can there be multiple local minima?](#93-can-there-be-multiple-local-minima)
  - [9.4 What about a circular array?](#94-what-about-a-circular-array)
  - [9.5 What if the array is fully sorted?](#95-what-if-the-array-is-fully-sorted)
  - [9.6 Can you do this recursively?](#96-can-you-do-this-recursively)
  - [9.7 How does this relate to gradient descent?](#97-how-does-this-relate-to-gradient-descent)
- [10. Key Takeaway](#10-key-takeaway)

---

## 1. Definition

A **local minimum** is an element in a collection that is **smaller than all its immediate neighbors**. A **local maximum** is an element that is **larger than all its immediate neighbors**.

### Formal Definition (1D Array)

For an array `A[0..n-1]` of distinct elements:

| Position | Condition for Local Min |
|---|---|
| `i = 0` (first element) | `A[0] < A[1]` |
| `i = n-1` (last element) | `A[n-1] < A[n-2]` |
| `0 < i < n-1` (interior) | `A[i] < A[i-1]` **AND** `A[i] < A[i+1]` |

*(Reverse the inequalities for local maximum.)*

---

## 2. Why It Matters in Interviews

- Tests understanding of **binary search** beyond sorted arrays
- Demonstrates **divide and conquer** thinking
- Common gateway to harder problems (peak element, 2D peak finding)
- Frequently asked at **FAANG-level** interviews

---

## 3. The Key Insight

> You do **NOT** need to scan the entire array. A local min/max **always exists** in any array of distinct elements, and you can find one in **O(log n)** using a modified binary search.

**Why must one always exist?**

- If the array is always increasing → the first element is a local min.
- If always decreasing → the last element is a local min.
- If it goes down then up at some point → that valley is a local min.
- In all cases, at least one exists.

---

## 4. Approach 1: Brute Force — O(n)

```
FUNCTION FindLocalMinBrute(A[0..n-1])

    IF n = 0 THEN
        RETURN -1

    IF n = 1 OR A[0] < A[1] THEN
        RETURN 0

    IF A[n-1] < A[n-2] THEN
        RETURN n - 1

    FOR i ← 1 TO n - 2 DO
        IF A[i] < A[i-1] AND A[i] < A[i+1] THEN
            RETURN i

    RETURN -1

END FUNCTION
```

**Time:** O(n) — not optimal

---

## 5. Approach 2: Binary Search — O(log n) ✅

### 5.1 Algorithm

```
1. Look at the middle element A[mid].
2. If A[mid] is less than both neighbors → it's a local min. Done!
3. If A[mid-1] < A[mid] → a local min MUST exist on the left half.
   (Because either we keep decreasing to the left edge,
    or we find a valley — either way, a local min is there.)
4. Else → go right.
```

### 5.2 Pseudocode Implementation

```
FUNCTION FindLocalMin(A[0..n-1])

    IF n = 0 THEN
        RETURN -1

    IF n = 1 THEN
        RETURN 0

    ——— Edge checks ———

    IF A[0] < A[1] THEN
        RETURN 0

    IF A[n-1] < A[n-2] THEN
        RETURN n - 1

    ——— Binary search on interior ———

    lo ← 1
    hi ← n - 2

    WHILE lo ≤ hi DO

        mid  ← FLOOR((lo + hi) / 2)
        left  ← A[mid - 1]
        right ← A[mid + 1]
        curr  ← A[mid]

        IF curr < left AND curr < right THEN
            RETURN mid                          // Found local min

        ELSE IF left < curr THEN
            hi ← mid - 1                       // Go left

        ELSE
            lo ← mid + 1                       // Go right

    END WHILE

    RETURN -1          // Should never reach here with distinct elements

END FUNCTION
```

---

## 6. Walkthrough Example

```
Array:  [9, 7, 3, 1, 5, 8, 12]
Index:   0  1  2  3  4  5  6
```

**Edge checks first:**
- `A[0]=9` vs `A[1]=7` → 9 > 7, not a local min at 0.
- `A[6]=12` vs `A[5]=8` → 12 > 8, not a local min at 6.
- Set `lo = 1`, `hi = 5`.

| Step | lo | hi | mid | A[mid-1], A[mid], A[mid+1] | Action |
|------|----|----|-----|----------------------------|--------|
| 1 | 1 | 5 | 3 | 3, **1**, 5 | **1 < 3 AND 1 < 5 → FOUND at index 3** |

**Result:** Index 3 (value 1) is a local minimum. ✅

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n) | O(1) |
| Binary Search | **O(log n)** | O(1) |

---

## 8. Variations

### 8.1 Find a Peak Element (Local Max)

Flip the comparison signs. This is **LeetCode #162**.

```
FUNCTION FindPeak(A[0..n-1])

    lo ← 0
    hi ← n - 1

    WHILE lo < hi DO

        mid ← FLOOR((lo + hi) / 2)

        IF A[mid] < A[mid + 1] THEN
            lo ← mid + 1                   // Peak is to the right
        ELSE
            hi ← mid                       // Peak is at mid or to the left

    END WHILE

    RETURN lo

END FUNCTION
```

### 8.2 2D Peak Finding (Matrix)

Find an element greater than all 4 neighbors in an `m × n` matrix.

**Strategy:**
1. Pick the middle column.
2. Find the global maximum in that column → O(m).
3. Compare it to its left and right neighbors.
4. If it is larger than both → peak found.
5. Otherwise, recurse into the half that contains the larger neighbor.

**Time:** O(m log n) or O(n log m), depending on which dimension you split.

### 8.3 Multiple Local Minima

Binary search finds **one**. Finding **all** local minima requires a full scan → **O(n)** in the worst case, and that is tight because every other element could be a local minimum.

---

## 9. Common Interview Follow-Up Questions & Answers

### 9.1 Why does binary search work on an unsorted array?

Binary search does **not** require a sorted array. It requires a **decision rule** that guarantees the target exists in one of the two halves so you can safely discard the other.

For local min, the rule is the **descent argument**:

```
After edge checks, we know:
    A[0] > A[1]          (left edge goes DOWN)
    A[n-2] < A[n-1]      (right edge goes UP)

At any mid:
  • If A[mid-1] < A[mid], then on the subarray [lo..mid-1]
    the left boundary is still "descending inward" and the
    right boundary (mid) is higher than mid-1.
    By the intermediate value / pigeonhole reasoning,
    a local min MUST exist in that half.

  • Symmetric reasoning applies when going right.
```

This guarantees we always keep a half that **must contain** a local minimum.

---

### 9.2 Does this work with duplicates?

**Not reliably.** Duplicates break the strict inequality that drives the decision rule.

**Example:**

```
[1, 1, 1, 1, 0, 1, 1]
```

At `mid = 3`, `A[mid] == A[mid-1] == A[mid+1]`. You cannot determine which half to discard. In the worst case (e.g., all elements identical except one), you must inspect every element → **O(n)**.

**What to tell the interviewer:**
> "With distinct elements, O(log n) is guaranteed. With duplicates, worst case degrades to O(n). We can try to handle plateaus by linearly scanning away from mid until we find a strict change, but that loses the log-time guarantee."

---

### 9.3 Can there be multiple local minima?

**Yes.** Consider:

```
[5, 1, 4, 2, 6]
     ^     ^
   idx 1  idx 3   ← both are local minima
```

- The binary search approach finds **any one** of them (whichever the search path reaches first).
- Finding **all** of them requires O(n) because each must be individually verified.
- In an array of `n` distinct elements, there can be up to **⌊n/2⌋** local minima (alternating pattern like `[3,1,3,1,3]`).

---

### 9.4 What about a circular array?

In a circular array, element `0` and element `n-1` are neighbors.

**Neighbor calculation:**

```
left_neighbor  ← A[(i - 1 + n) MOD n]
right_neighbor ← A[(i + 1) MOD n]
```

**Brute force approach (O(n)):**

```
FUNCTION FindLocalMinCircular(A[0..n-1])

    FOR i ← 0 TO n - 1 DO

        left  ← A[(i - 1 + n) MOD n]
        right ← A[(i + 1) MOD n]

        IF A[i] < left AND A[i] < right THEN
            RETURN i

    END FOR

    RETURN -1

END FUNCTION
```

**Can we still use binary search?**
Not directly with the same argument, because we lose the fixed "descending left edge / ascending right edge" boundary conditions. However, if the circular array has a special structure (e.g., a rotated sorted array), binary search variants apply — this leads to **LeetCode #153 (Find Minimum in Rotated Sorted Array)**.

---

### 9.5 What if the array is fully sorted?

| Sorted Order | Local Min | Local Max |
|---|---|---|
| Ascending `[1,2,3,4,5]` | First element (index 0) | Last element (index n-1) |
| Descending `[5,4,3,2,1]` | Last element (index n-1) | First element (index 0) |

The edge checks in our algorithm handle both cases immediately in **O(1)**, before the loop even starts.

---

### 9.6 Can you do this recursively?

Yes. The iterative binary search converts naturally to recursion:

```
FUNCTION FindLocalMinRecursive(A[0..n-1], lo, hi)

    mid ← FLOOR((lo + hi) / 2)

    ——— Check if mid is a local min ———

    isLessThanLeft  ← (mid = 0)     OR A[mid] < A[mid - 1]
    isLessThanRight ← (mid = n - 1) OR A[mid] < A[mid + 1]

    IF isLessThanLeft AND isLessThanRight THEN
        RETURN mid

    ——— If left neighbor is smaller, go left ———

    IF mid > 0 AND A[mid - 1] < A[mid] THEN
        RETURN FindLocalMinRecursive(A, lo, mid - 1)

    ——— Otherwise, go right ———

    RETURN FindLocalMinRecursive(A, mid + 1, hi)

END FUNCTION


// Usage
result ← FindLocalMinRecursive(A, 0, n - 1)
```

| | Iterative | Recursive |
|---|---|---|
| **Time** | O(log n) | O(log n) |
| **Space** | O(1) | O(log n) call stack |
| **Interview preference** | Generally preferred | Fine if asked or if clearer to explain |

---

### 9.7 How does this relate to gradient descent?

This is a great question to demonstrate **breadth of knowledge**.

| Aspect | Local Min (Array) | Gradient Descent |
|---|---|---|
| **Domain** | Discrete (finite array) | Continuous (differentiable function) |
| **"Slope" signal** | Compare `A[mid]` to neighbors | Compute gradient ∇f(x) |
| **Move direction** | Go toward the smaller neighbor | Step opposite to gradient |
| **Guarantee** | Finds **a** local min (global if unimodal) | Converges to **a** local min |
| **Limitation** | Finds only one; may miss global min | Can get stuck in local minima |

**Key parallel:** Both exploit the idea of **following the descent direction** — if a neighbor is lower, move toward it, because a minimum must lie in that direction (or you would have already found one).

---

## 10. Key Takeaway

> **Binary search doesn't require a sorted array — it requires a decision rule that lets you eliminate half the search space.** For the local min/max problem, the slope direction relative to the midpoint provides that rule. Master this insight and you unlock an entire family of binary search problems beyond simple sorted-array lookups.

---