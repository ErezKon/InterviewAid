# 393. UTF-8 Validation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/utf-8-validation](https://leetcode.com/problems/utf-8-validation)
**Companies:** Google, Meta, Snapchat, Tesla

---

## Problem Description

Given an integer array `data` representing the data, return whether it is a valid **UTF-8** encoding (i.e. it translates to a sequence of valid UTF-8 encoded characters).

A character in **UTF8** can be from **1 to 4 bytes** long, subjected to the following rules:

1. For a **1-byte** character, the first bit is a `0`, followed by its Unicode code.
2. For an **n-bytes** character, the first `n` bits are all one's, the `n + 1` bit is `0`, followed by `n - 1` bytes with the most significant `2` bits being `10`.

This is how the UTF-8 encoding would work:

```
     Number of Bytes   |        UTF-8 Octet Sequence
                       |              (binary)
   --------------------+-----------------------------------------
            1          |   0xxxxxxx
            2          |   110xxxxx 10xxxxxx
            3          |   1110xxxx 10xxxxxx 10xxxxxx
            4          |   11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

`x` denotes a bit in the binary form of a byte that may be either `0` or `1`.

**Note:** The input is an array of integers. Only the **least significant 8 bits** of each integer is used to store the data. This means each integer represents only 1 byte of data.

**Constraints:**
- `1 <= data.length <= 2 * 10^4`
- `0 <= data[i] <= 255`

## Examples

**Example 1:**
```
Input: data = [197,130,1]
Output: true
Explanation: data represents the octet sequence: 11000101 10000010 00000001.
It is a valid utf-8 encoding for a 2-bytes character followed by a 1-byte character.
```

**Example 2:**
```
Input: data = [235,140,4]
Output: false
Explanation: data represented the octet sequence: 11101011 10001100 00000100.
The first 3 bits are all one's and the 4th bit is 0 means it is a 3-bytes character.
The next byte is a continuation byte which starts with 10 and that's correct.
But the second continuation byte does not start with 10, so it is invalid.
```

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
