# 3597. Partition String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-string](https://leetcode.com/problems/partition-string)
**Companies:** Google

---

## Problem Description
Given a string `s`, partition it into **unique segments** according to the following procedure:

- Start building a segment beginning at index 0.
- Continue extending the current segment character by character until the current segment has not been seen before.
- Once the segment is unique, add it to your list of segments, mark it as seen, and begin a new segment from the next index.
- Repeat until you reach the end of `s`.

Return an array of strings `segments`, where `segments[i]` is the `i`-th segment created.

**Constraints:**

- `1 <= s.length <= 10^5`
- `s` contains only lowercase English letters.

## Examples

```
Example 1:
  Input: s = "abbccccd"
  Output: ["a","b","bc","c","cc","d"]
  Explanation:
  Index | Segment After Adding | Seen Segments            | Seen Before? | New Segment | Updated Seen Segments
  0     | "a"                  | []                       | No           | ""          | ["a"]
  1     | "b"                  | ["a"]                    | No           | ""          | ["a", "b"]
  2     | "b"                  | ["a", "b"]               | Yes          | "b"         | ["a", "b"]
  3     | "bc"                 | ["a", "b"]               | No           | ""          | ["a", "b", "bc"]
  4     | "c"                  | ["a", "b", "bc"]         | No           | ""          | ["a", "b", "bc", "c"]
  5     | "c"                  | ["a", "b", "bc", "c"]    | Yes          | "c"         | ["a", "b", "bc", "c"]
  6     | "cc"                 | ["a", "b", "bc", "c"]    | No           | ""          | ["a", "b", "bc", "c", "cc"]
  7     | "d"                  | ["a", "b", "bc", "c", "cc"] | No        | ""          | ["a", "b", "bc", "c", "cc", "d"]
  Hence, the final output is ["a", "b", "bc", "c", "cc", "d"].
```

```
Example 2:
  Input: s = "aaaa"
  Output: ["a","aa"]
  Explanation:
  Index | Segment After Adding | Seen Segments | Seen Before? | New Segment | Updated Seen Segments
  0     | "a"                  | []            | No           | ""          | ["a"]
  1     | "a"                  | ["a"]         | Yes          | "a"         | ["a"]
  2     | "aa"                 | ["a"]         | No           | ""          | ["a", "aa"]
  3     | "a"                  | ["a", "aa"]   | Yes          | "a"         | ["a", "aa"]
  Hence, the final output is ["a", "aa"].
```

## Approach
Simulate the procedure directly, tracking seen segments.
- Grow `cur` one character at a time. As soon as `cur` is not in `seen`, emit it, add it to `seen`, and reset `cur`.
- A leftover `cur` at the end (already seen) is discarded, as in Example 2.
- To avoid rebuilding/hashing strings, use a **trie**: walk one node per character from the root; if the child does not exist, create it, emit the segment, and jump back to the root. Every emitted segment is a fresh trie node, so membership checks are O(1) per character.
- Segment lengths are bounded by about sqrt(2n), since all segments are distinct (there are few short strings).

```text
FUNCTION partitionString(s):
    root ← new TrieNode
    node ← root
    start ← 0
    result ← []
    FOR i ← 0 TO LEN(s)-1:
        ch ← s[i]
        IF ch NOT IN node.children:
            node.children[ch] ← new TrieNode    // marks segment as seen
            APPEND s[start..i] TO result
            node ← root
            start ← i + 1
        ELSE:
            node ← node.children[ch]           // segment already seen, extend
    RETURN result                              // trailing seen segment dropped
```

## Walkthrough
Example 1: `s = "abbccccd"`.

| i | ch | Current segment | Seen? | Action | Result |
|---|----|-----------------|-------|--------|--------|
| 0 | a | "a" | No | emit, reset | ["a"] |
| 1 | b | "b" | No | emit, reset | ["a","b"] |
| 2 | b | "b" | Yes | extend | ["a","b"] |
| 3 | c | "bc" | No | emit, reset | ["a","b","bc"] |
| 4 | c | "c" | No | emit, reset | ["a","b","bc","c"] |
| 5 | c | "c" | Yes | extend | ["a","b","bc","c"] |
| 6 | c | "cc" | No | emit, reset | ["a","b","bc","c","cc"] |
| 7 | d | "d" | No | emit, reset | ["a","b","bc","c","cc","d"] |

Result: `["a","b","bc","c","cc","d"]`. (In Example 2, `"aaaa"` ends with an already-seen `"a"`, which is dropped.)

## Complexity Analysis
- **Time:** O(n) with the trie (one step per character); O(n * sqrt(n)) with a hash set of strings.
- **Space:** O(n) - at most one trie node per character.

## Follow-Up Questions
1. Why are segment lengths bounded by O(sqrt(n))?
2. How would you return only the number of segments, using O(1) extra memory beyond the trie?
3. What if a segment must also not be a prefix of any previously seen segment?

## Key Takeaway
When a process asks "has this growing string been seen?", a trie turns each extension into an O(1) child lookup instead of rehashing the whole string.
