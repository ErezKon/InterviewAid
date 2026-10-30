# 3850. Count Sequences to K
**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-sequences-to-k](https://leetcode.com/problems/count-sequences-to-k)
**Companies:** Google, Linkedin
---
## Table of Contents
- [3850. Count Sequences to K](#3850-count-sequences-to-k)
  - [**Companies:** Google, Linkedin](#companies-google-linkedin)
  - [Table of Contents](#table-of-contents)
  - [Problem Description](#problem-description)
  - [Examples](#examples)
  - [Hints](#hints)
  - [Key Insight](#key-insight)
  - [Approach](#approach)
  - [Walkthrough](#walkthrough)
  - [Complexity Analysis](#complexity-analysis)
  - [Follow-Up Questions](#follow-up-questions)
  - [Key Takeaway](#key-takeaway)
---
## Problem Description
You are given an integer array `nums`, and an integer `k`.

Start with an initial value `val = 1` and process `nums` from left to right. At each index `i`, you must choose **exactly one** of the following actions:

- **Multiply** `val` by `nums[i]`.
- **Divide** `val` by `nums[i]`.
- **Leave** `val` unchanged.

After processing all elements, `val` is considered equal to `k` only if its final rational value exactly equals `k`.

Return the count of **distinct sequences of choices** that result in `val == k`.

> **Note:** Division is rational (exact), not integer division. For example, `2 / 4 = 1 / 2`.

**Constraints:**
- `1 <= nums.length <= 19`
- `1 <= nums[i] <= 6`
- `1 <= k <= 10^15`

---
## Examples
**Example 1:**
```
Input: nums = [2,3,2], k = 6
Output: 2
```
| Sequence | Operation on nums[0] | Operation on nums[1] | Operation on nums[2] | Final val |
|----------|----------------------|----------------------|----------------------|-----------|
| 1 | Multiply: val = 1 × 2 = 2 | Multiply: val = 2 × 3 = 6 | Leave val unchanged | 6 |
| 2 | Leave val unchanged | Multiply: val = 1 × 3 = 3 | Multiply: val = 3 × 2 = 6 | 6 |

**Example 2:**
```
Input: nums = [4,6,3], k = 2
Output: 2
```
| Sequence | Operation on nums[0] | Operation on nums[1] | Operation on nums[2] | Final val |
|----------|----------------------|----------------------|----------------------|-----------|
| 1 | Multiply: val = 1 × 4 = 4 | Divide: val = 4 / 6 = 2/3 | Multiply: val = (2/3) × 3 = 2 | 2 |
| 2 | Leave val unchanged | Multiply: val = 1 × 6 = 6 | Divide: val = 6 / 3 = 2 | 2 |

**Example 3:**
```
Input: nums = [1,5], k = 1
Output: 3
```
| Sequence | Operation on nums[0] | Operation on nums[1] | Final val |
|----------|----------------------|----------------------|-----------|
| 1 | Multiply: val = 1 × 1 = 1 | Leave val unchanged | 1 |
| 2 | Divide: val = 1 / 1 = 1 | Leave val unchanged | 1 |
| 3 | Leave val unchanged | Leave val unchanged | 1 |

---
## Hints

1. Represent numbers by their prime exponents as `(2^x, 3^y, 5^z)`.
2. Use Dynamic Programming on the prime exponents: let `dp(idx, x, y, z)` be the number of ways to reach exponents `(x, y, z)` after processing index `idx`.
3. When `idx == nums.length`, compare `(x, y, z)` to the prime exponent decomposition of `k` and count matches.

---
## Key Insight
Since `nums[i] ∈ [1, 6]`, every value is a product of the primes **2, 3, and 5** only. Multiplying or dividing by `nums[i]` simply adds or subtracts its prime exponents. Therefore the running value `val` can always be represented as `2^x × 3^y × 5^z` (with possibly negative exponents from divisions). The problem reduces to a DP over these three exponent dimensions.

If `k` has any prime factor other than 2, 3, or 5, the answer is immediately **0**.

---
## Approach
```text
FUNCTION countSequences(nums, k):
    // Step 1: Decompose k into prime exponents
    (kx, ky, kz) ← primeExponents(k)     // k = 2^kx × 3^ky × 5^kz
    IF k still has remaining factors (not 5-smooth):
        RETURN 0

    n ← len(nums)

    // Step 2: Check reachability (exponent bounds with n steps)
    IF kx > 2·n OR ky > n OR kz > n:
        RETURN 0

    // Step 3: Precompute prime exponents for each nums[i]
    FOR i ← 0 TO n-1:
        (a[i], b[i], c[i]) ← primeExponents(nums[i])

    // Step 4: DP over prime exponent state
    dp ← MAP { (0, 0, 0) : 1 }          // start: val = 1 = 2^0 × 3^0 × 5^0

    FOR i ← 0 TO n-1:
        newDp ← empty MAP
        FOR EACH ((x, y, z), count) IN dp:
            // Choice 1: Multiply val by nums[i]
            newDp[(x + a[i], y + b[i], z + c[i])] += count
            // Choice 2: Divide val by nums[i]
            newDp[(x - a[i], y - b[i], z - c[i])] += count
            // Choice 3: Leave val unchanged
            newDp[(x, y, z)] += count
        dp ← newDp

    RETURN dp.get((kx, ky, kz), 0)

FUNCTION primeExponents(v):
    x ← 0; WHILE v % 2 == 0: v /= 2; x += 1
    y ← 0; WHILE v % 3 == 0: v /= 3; y += 1
    z ← 0; WHILE v % 5 == 0: v /= 5; z += 1
    RETURN (x, y, z)        // v must be 1 for the number to be 5-smooth
```
---
## Walkthrough
Take **Example 1** (`nums = [2,3,2]`, `k = 6 = 2^1 × 3^1 × 5^0`).

Prime exponents of each element: `nums[0]=2→(1,0,0)`, `nums[1]=3→(0,1,0)`, `nums[2]=2→(1,0,0)`.

| Step | dp state (x,y,z)→count | Explanation |
|------|------------------------|-------------|
| Init | `(0,0,0)→1` | val = 1 |
| i=0, nums[0]=2 | `(1,0,0)→1, (-1,0,0)→1, (0,0,0)→1` | Multiply→×2, Divide→÷2, Leave→unchanged |
| i=1, nums[1]=3 | 9 states (each of 3 states × 3 choices) | e.g. `(1,1,0)→1` from multiplying (1,0,0) by 3 |
| i=2, nums[2]=2 | `(1,1,0)→2` among others | Reached via: (0,1,0)×2 and (1,1,0) leave |

Result: `dp[(1,1,0)] = 2` matches the expected output.

---
## Complexity Analysis
| Aspect | Value |
|---|---|
| **Time** | O(n × E₂ × E₃ × E₅ × 3) where E₂ = 4n+1, E₃ = 2n+1, E₅ = 2n+1. Simplifies to **O(n⁴)** — with n ≤ 19 this is ≈ 6.6 M operations. |
| **Space** | O(E₂ × E₃ × E₅) = **O(n³)** for the DP map — at most ~117 K entries for n = 19. |

---
## Follow-Up Questions
1. Why is it important that `nums[i] ≤ 6`? What changes if values up to 30 were allowed?
2. How would the state space grow if `nums[i]` could include 7 or larger primes?
3. Can you prune unreachable exponent states early to speed up the DP?

---
## Key Takeaway
> **When values are products of a small set of primes, represent the running value by its prime exponent vector. The DP state becomes these exponents, and multiply / divide simply add / subtract the exponent vector of the chosen element. This avoids dealing with rational numbers entirely.**