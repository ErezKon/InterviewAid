# 710. Random Pick with Blacklist

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/random-pick-with-blacklist](https://leetcode.com/problems/random-pick-with-blacklist)
**Companies:** Amazon, Google, Uber

---

## Problem Description
You are given an integer `n` and an array of **unique** integers `blacklist`. Design an algorithm to pick a random integer in the range `[0, n - 1]` that is **not** in `blacklist`. Any integer that is in the mentioned range and not in `blacklist` should be **equally likely** to be returned.

Optimize your algorithm such that it minimizes the number of calls to the **built-in** random function of your language.

Implement the `Solution` class:

- `Solution(int n, int[] blacklist)` Initializes the object with the integer `n` and the blacklisted integers `blacklist`.
- `int pick()` Returns a random integer in the range `[0, n - 1]` and not in `blacklist`.

**Constraints:**

- `1 <= n <= 10⁹`
- `0 <= blacklist.length <= min(10⁵, n - 1)`
- `0 <= blacklist[i] < n`
- All the values of `blacklist` are **unique**.
- At most `2 * 10⁴` calls will be made to `pick`.

## Examples

```
Example 1:
  Input: ["Solution", "pick", "pick", "pick", "pick", "pick", "pick", "pick"]
         [[7, [2, 3, 5]], [], [], [], [], [], [], []]
  Output: [null, 0, 4, 1, 6, 1, 0, 4]
  Explanation:
    Solution solution = new Solution(7, [2, 3, 5]);
    solution.pick(); // return 0, any integer from [0,1,4,6] should be ok. Note that for every call of pick,
                     // 0, 1, 4, and 6 must be equally likely to be returned (i.e., with probability 1/4).
    solution.pick(); // return 4
    solution.pick(); // return 1
    solution.pick(); // return 6
    solution.pick(); // return 1
    solution.pick(); // return 0
    solution.pick(); // return 4
```

## Approach
**Hash Mapping – Remap Blacklisted Indices**
Treat the allowed numbers as a pool of size `size = n - len(blacklist)`. For each blacklisted number `b` that falls within the first `size` positions, map it to a non‑blacklisted number from the tail `[size, n)`. Store these mappings in a hash table.
When `pick()` is called:
1. Generate a random integer `r` in `[0, size-1]`.
2. If `r` is a key in the map, return `map[r]`; otherwise return `r`.
The preprocessing runs in O(|blacklist|) time, and each `pick()` is O(1).

```text
CLASS RandomPickWithBlacklist:
    CONSTRUCTOR(n, blacklist):
        SET size ← n - LENGTH(blacklist)
        SET blackSet ← SET(blacklist)
        SET mapping ← DICTIONARY()
        SET j ← n - 1
        FOR b IN blacklist:
            IF b < size:
                WHILE j IN blackSet:
                    SET j ← j - 1
                SET mapping[b] ← j
                SET j ← j - 1

    FUNCTION pick():
        SET randIdx ← RANDOM_INTEGER(0, size - 1)
        RETURN mapping.GET(randIdx, randIdx)
```

## Walkthrough
For `n = 7`, `blacklist = [2,3,5]`:
- `size = 4` (allowed numbers count).
- Blacklisted numbers `< size` are `2` and `3`.
- Tail numbers not in blacklist are `4` and `6`.
- Map `2 → 6`, `3 → 4`.
Calling `pick()` generates `randIdx` in `[0,3]`. If it is `2` or `3`, the map redirects to `6` or `4`; otherwise it returns the index itself, yielding a uniform selection among `{0,1,4,6}`.

## Complexity Analysis
Time: O(|blacklist|) preprocessing; O(1) per `pick()`.
Space: O(|blacklist|) for the hash map.

## Follow‑Up Questions
1. How would you adapt the solution if `pick()` needed to support removal of returned numbers?
2. Can the approach be extended to handle multiple blacklists for different ranges?
3. What are the trade‑offs of using a balanced tree instead of a hash map for deterministic ordering?

## Key Takeaway
By remapping blacklisted indices in the first part of the range to valid indices in the tail, we achieve constant‑time uniform random selection without storing the entire allowed set.
