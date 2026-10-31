# 3842. Toggle Light Bulbs

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/toggle-light-bulbs](https://leetcode.com/problems/toggle-light-bulbs)
**Companies:** Juspay

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

You are given an array `bulbs` of integers between 1 and 100.

There are 100 light bulbs numbered from 1 to 100. All of them are switched off initially.

For each element `bulbs[i]` in the array `bulbs`:

- If the `bulbs[i]`th light bulb is currently off, switch it on.
- Otherwise, switch it off.

Return the list of integers denoting the light bulbs that are on in the end, **sorted** in **ascending** order. If no bulb is on, return an empty list.

**Constraints:**
- `1 <= bulbs.length <= 100`
- `1 <= bulbs[i] <= 100`

## Examples

**Example 1:**
```
Input: bulbs = [10,30,20,10]
Output: [20,30]
Explanation:
- The bulbs[0] = 10th light bulb is currently off. We switch it on.
- The bulbs[1] = 30th light bulb is currently off. We switch it on.
- The bulbs[2] = 20th light bulb is currently off. We switch it on.
- The bulbs[3] = 10th light bulb is currently on. We switch it off.
- In the end, the 20th and the 30th light bulbs are on.
```

**Example 2:**
```
Input: bulbs = [100,100]
Output: []
Explanation:
- The bulbs[0] = 100th light bulb is currently off. We switch it on.
- The bulbs[1] = 100th light bulb is currently on. We switch it off.
- In the end, no light bulb is on.
```

## Approach
A bulb ends up on exactly when it is toggled an odd number of times. Keep a parity array `st[1..100]`, flip `st[x]` for each `x` in `bulbs`, then scan 1..100 and collect the indices still set. Scanning the fixed range in order gives the sorted output for free.

```text
FUNCTION toggleLightBulbs(bulbs):
    SET st ← ARRAY of size 101 filled with 0
    FOR x IN bulbs:
        SET st[x] ← st[x] XOR 1
    SET result ← empty list
    FOR i ← 1 TO 100:
        IF st[i] = 1:
            APPEND i TO result
    RETURN result
```

## Walkthrough
For `bulbs = [10,30,20,10]`:
- Toggle 10 -> `st[10] = 1`
- Toggle 30 -> `st[30] = 1`
- Toggle 20 -> `st[20] = 1`
- Toggle 10 -> `st[10] = 0`
- Scan 1..100: only `st[20]` and `st[30]` are 1 -> `[20,30]`, matching the expected output.

## Complexity Analysis
*Time*: O(n + 100) - one pass over `bulbs` plus a fixed scan of the 100 bulbs.
*Space*: O(100) = O(1) for the parity array.

## Follow-Up Questions
1. If the bulb numbers ranged up to 10^9, how would you do it (hash set: add on first toggle, remove on second, then sort)?
2. How would you answer "which bulbs are on after the first `k` operations" for many `k` efficiently?
3. Can you solve it with a single 128-bit bitmask and XOR, and how would you extract the set bits in order?

## Key Takeaway
Toggling is XOR: only the parity of each bulb's count matters, and a fixed-size array scanned in order yields the sorted answer directly.
