# 1177. Can Make Palindrome from Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-make-palindrome-from-substring](https://leetcode.com/problems/can-make-palindrome-from-substring)
**Companies:** Akuna Capital

---

## 1. Problem Description

Given a string `s` and multiple queries of the form `[left, right, k]`, determine for each query whether the substring `s[left..right]` can be rearranged into a palindrome after changing at most `k` characters.

---

## 2. Key Insight

> A string can be permuted into a palindrome if at most one character appears an odd number of times. To fix `f` odd‑frequency characters we need `⌊f/2⌋` replacements. Thus the query reduces to counting odd‑frequency characters in the range and checking `oddCount/2 ≤ k`.

---

## 3. Approach: Prefix XOR Bitmask — O(n + q) ✅

```text
FUNCTION canMakePaliQueries(s, queries):
    // Build prefix parity bitmask
    prefix ← ARRAY[0..LEN(s)] OF 0
    FOR i ← 0 TO LEN(s)-1:
        bit ← 1 << (ORD(s[i]) - ORD('a'))
        prefix[i+1] ← prefix[i] XOR bit
    
    result ← []
    FOR each (left, right, k) IN queries:
        // Parity of characters in s[left..right]
        oddMask ← prefix[right+1] XOR prefix[left]
        oddCount ← POPCOUNT(oddMask)
        // Need oddCount/2 replacements
        result.ADD( (oddCount // 2) ≤ k )
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
s = "abcda"
queries = [[3,3,0],[1,2,0],[0,4,1]]
Output: [true,false,true]
Explanation:
- Query 0: substring "d" is already a palindrome.
- Query 1: substring "bc" has two odd characters, need 1 replacement > k=0.
- Query 2: substring "abcda" has oddCount=3 (a,b,c), need 1 replacement ≤ k=1.
```

---

## 5. Walkthrough

Consider the third query `[0,4,1]` on `s = "abcda"`.
1. Build prefix masks: `[0, 1<<a, 1<<a|1<<b, ...]` (omitted for brevity).
2. `oddMask = prefix[5] XOR prefix[0]` yields bits for `a,b,c` → `oddCount = 3`.
3. Required replacements = `3 // 2 = 1`.
4. Since `1 ≤ k`, answer is `true`.

---

## 6. Complexity Analysis

- **Time:** O(n + q) – one pass to build the prefix array and O(1) per query.
- **Space:** O(n) for the prefix bitmask array (plus O(1) auxiliary space).

---

## 7. Follow-Up Questions

- How would you extend the solution to support Unicode characters beyond lowercase English letters?
- Can the approach be adapted to handle dynamic updates to the string (e.g., character replacements) while still answering queries efficiently?
- What if the allowed number of replacements `k` varies per character type?

---

## Key Takeaway

> Use a prefix XOR bitmask to capture parity of character frequencies; the number of odd‑frequency characters determines the minimum replacements needed to form a palindrome.
