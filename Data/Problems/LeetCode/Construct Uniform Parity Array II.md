# 3876. Construct Uniform Parity Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-uniform-parity-array-ii](https://leetcode.com/problems/construct-uniform-parity-array-ii)
**Companies:** Amdocs

---

## 1. Problem Description

Extended version of Uniform Parity Array I with additional constraints or larger input. Determine the minimum operations to make all elements the same parity.

---

## 2. Approach: Greedy / DP — O(n) ✅

```
FUNCTION minOperations(nums):
    // Try both target parities (all even, all odd)
    // For each, compute min total operations
    costEven = SUM(num % 2 for num in nums)       // cost to make all even
    costOdd = SUM((num + 1) % 2 for num in nums)  // cost to make all odd
    RETURN MIN(costEven, costOdd)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 2
Explanation: Make all numbers even (change 1 and 3) or all odd (change 2 and 4). Minimum operations = 2.
```

**Example 2:**
```
Input: nums = [2,2,2]
Output: 0
Explanation: Already all even, no operations needed.
```

---

## 4. Walkthrough

Consider `nums = [1,2,3,4]`.

| Index | Value | Parity (odd=1, even=0) |
|-------|-------|-----------------------|
| 0     | 1     | 1 |
| 1     | 2     | 0 |
| 2     | 3     | 1 |
| 3     | 4     | 0 |

- Cost to make all even = count of odd numbers = 2.
- Cost to make all odd  = count of even numbers = 2.
- Minimum = 2.

The algorithm simply counts odds and evens and returns the smaller count.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow-Up Questions

- How would the solution change if each operation could flip the parity of a *range* of elements?
- What if the cost to change an odd to even differs from even to odd?
- Can you extend the approach to handle multiple target parities (e.g., modulo 3)?

---

## Key Takeaway

> Changing parity costs 1 per element. Total cost = count of elements with wrong parity. Try both targets and take the minimum.
