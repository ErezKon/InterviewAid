# 2281. Sum of Total Strength of Wizards

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-total-strength-of-wizards](https://leetcode.com/problems/sum-of-total-strength-of-wizards)
**Companies:** Amazon, Meta

---

## Problem Description
Given an integer array `strength` where `strength[i]` is the strength of the i‑th wizard, consider every non‑empty contiguous subarray. The **total strength** of a subarray is defined as the product of the sum of its elements and the minimum element in that subarray. Return the sum of total strengths of all subarrays modulo `10^9 + 7`.

## Examples
**Example 1:**
```
Input: strength = [1,3,1,2]
Output: 44
Explanation:
All subarrays and their total strengths:
[1] → (1) * 1 = 1
[3] → (3) * 3 = 9
[1] → (1) * 1 = 1
[2] → (2) * 2 = 4
[1,3] → (4) * 1 = 4
[3,1] → (4) * 1 = 4
[1,2] → (3) * 1 = 3
[1,3,1] → (5) * 1 = 5
[3,1,2] → (6) * 1 = 6
[1,3,1,2] → (7) * 1 = 7
Sum = 44
```

**Example 2:**
```
Input: strength = [5,8,7]
Output: 236
```

## Approach
The formula `total = min * sum` suggests separating the contribution of each element when it acts as the minimum. For each index `i`, find the range where `strength[i]` is the **strictly** smallest element using a monotonic increasing stack to get `left[i]` (distance to previous smaller) and `right[i]` (distance to next smaller). Within that range, every subarray that includes `i` and where `i` is the minimum contributes `strength[i] * (sum of subarray elements)`. Prefix sums and prefix‑of‑prefix sums allow O(1) retrieval of any subarray sum, turning the contribution into a closed‑form expression.

```text
FUNCTION totalStrength(strength):
    SET MOD ← 1_000_000_007
    SET n ← LENGTH(strength)
    // Prefix sums
    SET prefix ← ARRAY[0..n] WITH 0
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← (prefix[i] + strength[i]) MOD MOD
    // Prefix of prefix sums
    SET prefix2 ← ARRAY[0..n] WITH 0
    FOR i ← 0 TO n-1:
        SET prefix2[i+1] ← (prefix2[i] + prefix[i+1]) MOD MOD
    // Monotonic stack to find previous/next smaller
    SET left ← ARRAY[n]
    SET right ← ARRAY[n]
    SET stack ← empty
    FOR i ← 0 TO n-1:
        WHILE stack NOT EMPTY AND strength[stack.TOP] > strength[i]:
            SET idx ← POP(stack)
            SET right[idx] ← i
        PUSH(i, stack)
    WHILE stack NOT EMPTY:
        SET idx ← POP(stack)
        SET right[idx] ← n
    SET stack ← empty
    FOR i ← n-1 DOWNTO 0:
        WHILE stack NOT EMPTY AND strength[stack.TOP] >= strength[i]:
            SET idx ← POP(stack)
            SET left[idx] ← i
        PUSH(i, stack)
    WHILE stack NOT EMPTY:
        SET idx ← POP(stack)
        SET left[idx] ← -1
    // Compute contribution
    SET answer ← 0
    FOR i ← 0 TO n-1:
        SET l ← i - left[i]
        SET r ← right[i] - i
        // Sum of prefix sums for left part
        SET totalLeft ← (prefix2[i+1] - prefix2[left[i]+1] + MOD) MOD MOD
        SET totalRight ← (prefix2[right[i]] - prefix2[i] + MOD) MOD MOD
        SET contribution ← strength[i] * (r * totalLeft - l * totalRight) MOD MOD
        SET answer ← (answer + contribution) MOD MOD
    RETURN answer
```

## Walkthrough
Take `strength = [1,3,1,2]`.
1. Compute `left` and `right` distances where each element is the minimum.
   - Index 0 (1): left = -1, right = 2 → l=1, r=2
   - Index 1 (3): left = 0, right = 2 → l=1, r=1
   - Index 2 (1): left = -1, right = 4 → l=3, r=2
   - Index 3 (2): left = 2, right = 4 → l=1, r=1
2. Using prefix sums, evaluate each contribution via the formula above, yielding contributions 1, 9, 30, 4 respectively; their sum modulo `10^9+7` is 44.

## Complexity Analysis
- **Time:** O(n) – each element is processed a constant number of times (two stack passes and linear scans).
- **Space:** O(n) – for prefix arrays, prefix‑of‑prefix arrays, and the stacks.

## Follow-Up Questions
1. How would the solution change if the subarray minimum were replaced by the maximum?
2. Can the same technique be applied to compute the sum of `max * sum` for all subarrays?
3. What modifications are needed to handle very large input values without overflow (beyond modulo arithmetic)?

## Key Takeaway
By treating each element as the minimum of a range and using prefix‑of‑prefix sums, the problem reduces to O(n) time with simple arithmetic, avoiding explicit enumeration of all subarrays.
