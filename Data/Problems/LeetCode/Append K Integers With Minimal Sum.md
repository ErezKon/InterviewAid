# 2195. Append K Integers With Minimal Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/append-k-integers-with-minimal-sum](https://leetcode.com/problems/append-k-integers-with-minimal-sum)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given an array `nums` and integer `k`, append `k` unique positive integers not in `nums` to the array such that the sum of appended integers is minimized. Return that minimum sum.

---

## 2. Key Insight

> Greedily pick the smallest positive integers not in `nums`. Sort `nums`, then use the sum formula `1+2+...+m` minus numbers in `nums` that fall within that range.

---

## 3. Approach: Sort + Arithmetic Sum — O(n log n) ✅

```text
FUNCTION minimalKSum(nums, k):
    // Sort and deduplicate the input array
    SORT nums
    REMOVE duplicates from nums
    SET result ← 0
    SET prev ← 0
    FOR num IN nums:
        // Count missing integers between prev and current number
        SET gap ← num - prev - 1
        SET take ← MIN(gap, k)
        IF take > 0:
            // Sum of consecutive integers from (prev+1) to (prev+take)
            SET result ← result + (prev + 1 + prev + take) * take / 2
            SET k ← k - take
        IF k == 0:
            BREAK
        SET prev ← num
    IF k > 0:
        // Append remaining integers after the largest element
        SET result ← result + (prev + 1 + prev + k) * k / 2
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [1,4,25,10,25], k = 2
Output: 5
Explanation:
Missing positive integers are [2,3,5,6,7,8,9,11,...].
The smallest two are 2 and 3, sum = 5.
```

**Example 2:**
```
Input: nums = [5,6], k = 6
Output: 25
Explanation:
Missing integers start from 1. The first six are 1,2,3,4,7,8, sum = 25.
```

---

## 5. Walkthrough

| Step | prev | nums element | gap | take | result | k |
|------|------|--------------|-----|------|--------|---|
| Init | 0 | – | – | – | 0 | 2 |
| 1 | 0 | 1 | 0 | 0 | 0 | 2 |
| 2 | 1 | 4 | 2 (2,3) | 2 | 0+ (2+3)*2/2 = 5 | 0 |
| End | – | – | – | – | 5 | 0 |

The algorithm stops once `k` becomes zero, having collected the minimal sum.

---

## 6. Complexity Analysis

- **Time:** O(n log n) for sorting the array, where n = length of `nums`.
- **Space:** O(1) extra space besides the input array (in‑place sorting assumed).

---

## 7. Follow‑Up Questions

- How would you modify the solution if `nums` could contain negative numbers?
- Can you solve the problem in O(n) time using a hash set instead of sorting?
- What if you needed to return the actual appended integers, not just their sum?

---

## Key Takeaway

> Sort the existing numbers, then greedily fill gaps with the smallest available integers using arithmetic sum formula to avoid iteration.
