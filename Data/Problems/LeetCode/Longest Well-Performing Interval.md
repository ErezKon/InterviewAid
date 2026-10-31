# 1124. Longest Well-Performing Interval

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-well-performing-interval](https://leetcode.com/problems/longest-well-performing-interval)
**Companies:** Infosys, Netapp

---

## 1. Problem Description

We are given `hours`, a list of the number of hours worked per day for a given employee.

A day is considered to be a *tiring day* if and only if the number of hours worked is (strictly) greater than `8`.

A *well-performing interval* is an interval of days for which the number of tiring days is strictly larger than the number of non-tiring days.

Return the length of the longest well-performing interval.

**Constraints:**
- `1 <= hours.length <= 10^4`
- `0 <= hours[i] <= 16`

---

## 2. Approach: Prefix Sum + Hash Map — O(n) ✅

```text
FUNCTION longestWPI(hours):
    SET score ← 0               // +1 for tiring, -1 for non-tiring
    SET first ← MAP()           // first occurrence of each score
    SET maxLen ← 0

    FOR i ← 0 TO LENGTH(hours) - 1:
        IF hours[i] > 8:
            SET score ← score + 1
        ELSE:
            SET score ← score - 1
        IF score > 0:
            SET maxLen ← i + 1
        ELSE:
            IF (score - 1) IN first:
                SET maxLen ← MAX(maxLen, i - first[score - 1])
            IF score NOT IN first:
                SET first[score] ← i

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

**Example 1:**
```
Input: hours = [9,9,6,0,6,6,9]
Output: 3
Explanation: The longest well-performing interval is [9,9,6].
```

**Example 2:**
```
Input: hours = [6,6,6]
Output: 0
```

---

## 4. Walkthrough

| Step | i | hours[i] | score | first map | maxLen |
|------|---|----------|-------|-----------|--------|
| 1 | 0 | 9 (>8) | 1 | {} → {} (score 1 >0) | 1 |
| 2 | 1 | 9 (>8) | 2 | {} | 2 |
| 3 | 2 | 6 (≤8) | 1 | {} | 3 (i+1) |
| 4 | 3 | 0 (≤8) | 0 | {0:3} (first occurrence) | 3 |
| 5 | 4 | 6 (≤8) | -1 | {0:3, -1:4} | 3 |
| 6 | 5 | 6 (≤8) | -2 | {0:3, -1:4, -2:5} | 3 |
| 7 | 6 | 9 (>8) | -1 | {0:3, -1:4, -2:5} → check (score-1) = -2 in first → maxLen = MAX(3, 6-5)=3 |

---

## 5. Complexity Analysis

- **Time:** One pass over the array → O(n).
- **Space:** Hash map stores at most one entry per distinct prefix sum → O(n).

---

## 6. Follow-Up Questions

1. How would you adapt the algorithm if the threshold for a tiring day changes dynamically?
2. Can you solve the problem using a monotonic stack instead of a hash map?
3. What is the solution if you need to return the actual interval indices, not just the length?

---

## Key Takeaway

Convert the problem to a +1/-1 prefix sum; the longest well-performing interval is the farthest distance between a prefix sum and its earliest occurrence of `score-1`.
