# 1481. Least Number of Unique Integers after K Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals)
**Companies:** Amazon, Fivetran, Google, Morgan Stanley, Oracle, Salesforce

---

## 1. Problem Description

Remove exactly `k` elements from the array to minimize the number of unique integers remaining. Return the smallest possible count of distinct numbers after the removals.

---

## 2. Examples

**Example 1:**
```
Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the element `4`. The array becomes [5,5] with only one unique integer.
```

**Example 2:**
```
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove three occurrences of `1` (or any three elements with smallest frequencies). Remaining unique integers are {2,3,4} but after optimal removals only two distinct values stay.
```

---

## 3. Approach: Greedy — O(n log n) ✅

Remove elements with the smallest frequency first to eliminate the most unique values.

```text
FUNCTION findLeastNumOfUniqueInts(arr, k):
    // Count frequency of each integer
    SET freqMap ← Counter(arr)
    // Sort frequencies ascending
    SET sortedFreqs ← SORT(values of freqMap)
    FOR i ← 0 TO LENGTH(sortedFreqs) - 1:
        SET f ← sortedFreqs[i]
        SET k ← k - f
        IF k < 0:
            RETURN LENGTH(sortedFreqs) - i
    RETURN 0
```

---

## 4. Walkthrough

| Step | Array State | Frequencies | k remaining | Action |
|------|-------------|-------------|-------------|--------|
| 1 | [5,5,4] | {5:2, 4:1} | 1 | Remove integer with freq 1 (`4`). |
| 2 | [5,5] | {5:2} | 0 | Stop. Unique count = 1 |

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) – sorting frequencies | O(n) – hashmap for counts |

---

## 6. Follow-Up Questions

1. How would the solution change if you could remove at most `k` elements instead of exactly `k`?
2. Can you solve the problem in O(n) time using a bucket sort on frequencies?
3. How would you extend this to a streaming scenario where numbers arrive continuously?

---

## Key Takeaway

> Sort frequencies ascending, greedily remove the cheapest (lowest frequency) elements first. Stop when `k` is exhausted.
