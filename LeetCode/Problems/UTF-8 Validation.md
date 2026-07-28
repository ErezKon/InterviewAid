# 393. UTF-8 Validation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/utf-8-validation](https://leetcode.com/problems/utf-8-validation)
**Companies:** Google, Meta, Snapchat, Tesla

---

## Problem Description
Given an array of integers `data` where each integer represents a byte (0 ≤ byte ≤ 255), determine if the array is a valid UTF-8 encoding. UTF-8 encodes characters using 1 to 4 bytes with specific leading bit patterns. Return `true` if the sequence follows the UTF-8 rules, otherwise `false`.

## Examples
**Example 1:**
Input: `data = [197,130,1]`
Output: `true`
Explanation: `197` (11000101) starts a 2‑byte character, `130` (10000010) is a valid continuation, and `1` (00000001) is a 1‑byte character.

**Example 2:**
Input: `data = [235,140,4]`
Output: `false`
Explanation: `235` (11101011) indicates a 3‑byte character, but the following byte `4` (00000100) does not start with `10`.

## Approach
Iterate through the bytes while tracking how many continuation bytes are expected (`remaining`). For each byte:
- If `remaining > 0`, verify the two most‑significant bits are `10`; decrement `remaining`.
- Otherwise, determine the length of a new character by inspecting the leading bits:
  - `0xxxxxxx` → 1‑byte (no continuation).
  - `110xxxxx` → expect 1 continuation.
  - `1110xxxx` → expect 2 continuations.
  - `11110xxx` → expect 3 continuations.
  - Anything else → invalid.
At the end, the sequence is valid only if `remaining == 0`.

## Walkthrough
| Index | Byte (binary) | Action | remaining after |
|-------|---------------|--------|-----------------|
| 0 | 11000101 | start 2‑byte char → remaining=1 |
| 1 | 10000010 | continuation (starts with 10) → remaining=0 |
| 2 | 00000001 | 1‑byte char → remaining stays 0 |
All bytes processed and `remaining` is 0 → valid.

## Complexity Analysis
- **Time:** `O(n)` where `n` is the length of `data`.
- **Space:** `O(1)` extra variables.

## Follow‑Up Questions
1. How would you modify the algorithm to return the index of the first invalid byte?
2. Can the validation be performed in a streaming fashion without storing the whole array?
3. What changes are needed to support UTF‑16 validation instead?

## Key Takeaway
Tracking the expected number of continuation bytes while scanning the byte stream provides a simple linear‑time validation of UTF‑8 encoding.
