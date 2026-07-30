
# 238. Product of Array Except Self

**Difficulty:** 🟡 Medium
**Acceptance:** 68.1%
**LeetCode:** [https://leetcode.com/problems/product-of-array-except-self](https://leetcode.com/problems/product-of-array-except-self)
**Companies:** Accenture, Adobe, Amazon, Apple, Asana, Autodesk, Avito, Bloomberg, Ebay, Flipkart, Fractal Analytics, Freshworks, Goldman Sachs, Google, Ibm, Infosys, Intel, Intuit, Linkedin, Lyft, Meta, Microsoft, Nvidia, Okta, Oracle, Paypal, Quantcast, Ripple, Salesforce, Sap, Sigmoid, Snapchat, Tcs, Thousandeyes, Tiktok, Turing, Uber, Visa, Walmart Labs, Warnermedia, Wells Fargo, Yandex, Zoho, Zs Associates

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Why No Division?](#3-why-no-division)
4. [Approach 1: Prefix and Suffix Arrays — O(n) / O(n)](#4-approach-1-prefix-and-suffix-arrays--on--on)
5. [Approach 2: Two Passes — O(n) / O(1) ✅](#5-approach-2-two-passes--on--o1-)
6. [Walkthrough](#6-walkthrough)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the **product of all the elements** of `nums` except `nums[i]`.

**Constraints:**
- You must write an algorithm that runs in **O(n)** time.
- You **cannot use the division** operation.
- The output array does not count as extra space for complexity analysis.

---

## 2. Examples

```
Example 1:
  Input:  [1, 2, 3, 4]
  Output: [24, 12, 8, 6]
  Reason: answer[0] = 2×3×4 = 24
          answer[1] = 1×3×4 = 12
          answer[2] = 1×2×4 = 8
          answer[3] = 1×2×3 = 6

Example 2:
  Input:  [-1, 1, 0, -3, 3]
  Output: [0, 0, 9, 0, 0]
```

---

## 3. Why No Division?

The naive approach with division fails:
1. **Zeros** — can't divide by zero.
2. The problem explicitly forbids it.

So we need another way to compute "product of everything except me."

---

## 4. Approach 1: Prefix and Suffix Arrays — O(n) / O(n)

```
answer[i] = (product of all elements left of i) × (product of all elements right of i)
          = prefix[i] × suffix[i]
```

```
FUNCTION productExceptSelf(nums):
    n = LENGTH(nums)
    prefix = ARRAY of n, all 1
    suffix = ARRAY of n, all 1

    // Build prefix products
    FOR i ← 1 TO n - 1:
        prefix[i] = prefix[i-1] * nums[i-1]

    // Build suffix products
    FOR i ← n - 2 DOWNTO 0:
        suffix[i] = suffix[i+1] * nums[i+1]

    // Combine
    answer = ARRAY of n
    FOR i ← 0 TO n - 1:
        answer[i] = prefix[i] * suffix[i]

    RETURN answer
```

---

## 5. Approach 2: Two Passes — O(n) / O(1) ✅

Use the output array itself for the prefix, then multiply in the suffix with a running variable.

```
FUNCTION productExceptSelf(nums):
    n = LENGTH(nums)
    answer = ARRAY of n, all 1

    // Left pass: build prefix products in answer[]
    prefix = 1
    FOR i ← 0 TO n - 1:
        answer[i] = prefix
        prefix *= nums[i]

    // Right pass: multiply in suffix products
    suffix = 1
    FOR i ← n - 1 DOWNTO 0:
        answer[i] *= suffix
        suffix *= nums[i]

    RETURN answer
```

---

## 6. Walkthrough

```
nums = [1, 2, 3, 4]

Left pass (build prefix in answer):
  i=0: answer[0]=1,    prefix=1*1=1
  i=1: answer[1]=1,    prefix=1*2=2
  i=2: answer[2]=2,    prefix=2*3=6
  i=3: answer[3]=6,    prefix=6*4=24

  answer = [1, 1, 2, 6]

Right pass (multiply suffix):
  i=3: answer[3]=6*1=6,      suffix=1*4=4
  i=2: answer[2]=2*4=8,      suffix=4*3=12
  i=1: answer[1]=1*12=12,    suffix=12*2=24
  i=0: answer[0]=1*24=24,    suffix=24*1=24

  answer = [24, 12, 8, 6] ✅
```

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix + Suffix arrays | O(n) | O(n) |
| **Two passes** | **O(n)** | **O(1)** (excluding output) |

---

## 8. Follow-Up Questions

### 8.1 What if division were allowed?

```
FUNCTION productExceptSelfDiv(nums):
    totalProduct = product of all non-zero elements
    zeroCount = count of zeros in nums

    FOR i ← 0 TO n - 1:
        IF zeroCount > 1:
            answer[i] = 0
        ELSE IF zeroCount == 1:
            answer[i] = 0 IF nums[i] != 0 ELSE totalProduct
        ELSE:
            answer[i] = totalProduct / nums[i]

    RETURN answer
```

### 8.2 What about handling integer overflow?

- Use `long` / 64-bit integers.
- Or compute modular products if the problem asks for results mod some prime.

### 8.3 Can it be done with logarithms?

Yes (for positive numbers only): `log(a × b) = log(a) + log(b)`.

1. Compute `totalLogSum = sum of log(nums[i])` for all i.
2. `answer[i] = exp(totalLogSum - log(nums[i]))`.

But this introduces floating-point errors and doesn't handle zeros or negatives.

### 8.4 What about a 2D version?

Given an m × n matrix, compute the "product of all elements except (r, c)" for each cell.

- Flatten to 1D, apply the same algorithm.
- Or compute row-prefix products and column-prefix products separately, then combine.

---

## Key Takeaway

> The "no division" constraint forces you to think in terms of **prefix and suffix decomposition**. `answer[i] = prefix[i] × suffix[i]`. This pattern — splitting a computation into left-to-right and right-to-left passes — appears in many problems: trapping rain water, candy distribution, stock profit, and more.
