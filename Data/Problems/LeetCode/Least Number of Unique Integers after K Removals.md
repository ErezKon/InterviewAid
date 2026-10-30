# 1481. Least Number of Unique Integers after K Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals)
**Companies:** Amazon, Fivetran, Google, Morgan Stanley, Oracle, Salesforce

---

## 1. Problem Description

Given an array of integers `arr` and an integer `k`. Find the *least number of unique integers* after removing **exactly** `k` elements.

**Constraints:**
- `1 <= arr.length <= 10^5`
- `1 <= arr[i] <= 10^9`
- `0 <= k <= arr.length`

---

## 2. Examples

```
Example 1:
  Input: arr = [5,5,4], k = 1
  Output: 1
  Explanation: Remove the single 4, only 5 is left.
```

```
Example 2:
  Input: arr = [4,3,1,1,3,3,2], k = 3
  Output: 2
  Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.
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
