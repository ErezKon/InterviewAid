# 846. Hand of Straights

**Difficulty:** 🟡 Medium
**Acceptance:** 57.0%
**LeetCode:** [https://leetcode.com/problems/hand-of-straights](https://leetcode.com/problems/hand-of-straights)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Visa

---

## 1. Problem Description

Given `hand` (array of integers) and `groupSize`, return `true` if the hand can be rearranged into groups of `groupSize` consecutive integers.

---

## 2. Examples

**Example 1:**
```
hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: The hand can be rearranged as [1,2,3],[2,3,4],[6,7,8].
```

**Example 2:**
```
hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: It is impossible to form groups of size 4.
```

---

## 3. Approach: Sorted Map — O(n log n) ✅

```text
FUNCTION isNStraightHand(hand, groupSize):
    IF len(hand) MOD groupSize != 0: RETURN false
    count ← sorted frequency map of hand
    WHILE count IS NOT EMPTY:
        start ← MIN key in count
        FOR i ← start TO start + groupSize - 1:
            IF i NOT IN count: RETURN false
            count[i] ← count[i] - 1
            IF count[i] == 0: DELETE count[i]
    RETURN true
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 4. Walkthrough

| Step | Hand (sorted) | Action |
|------|---------------|--------|
| 1 | [1,2,2,3,3,4,6,7,8] | Start with smallest `1`. Form group `[1,2,3]`. Decrement counts.
| 2 | Remaining counts: 2→1,3→1,4→1,6→1,7→1,8→1 | Next smallest `2`. Form group `[2,3,4]`.
| 3 | Remaining counts: 6→1,7→1,8→1 | Next smallest `6`. Form group `[6,7,8]`.
| 4 | No cards left → return `true`.

---

## 5. Complexity Analysis

- **Time:** Sorting the keys and processing each card once → O(n log n).
- **Space:** Frequency map stores at most n entries → O(n).

---

## 6. Follow-Up Questions

- How would the solution change if `groupSize` could vary for each group?
- Can you solve the problem in O(n) time using a bucket sort approach when the value range is limited?

---

## Key Takeaway

> Greedy: always start from the smallest available card. Try to form a group of `groupSize` consecutive cards. If any card is missing, return false.
