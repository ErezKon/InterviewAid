# Two Pointer Patterns

Related: #11, #42, #167, #15, #16, #75

---

## Two Pointer Taxonomy

| Pattern | Example Problems |
|---------|-----------------|
| **Opposite ends** | Two Sum II (#167), Container (#11), Trapping Rain Water (#42) |
| **Same direction (fast/slow)** | Remove Duplicates (#26), Move Zeroes (#283), Linked List Cycle (#141) |
| **Sliding window** | Min Window Substring (#76), Longest Without Repeating (#3) |
| **Three pointers** | 3Sum (#15), Dutch Flag (#75) |

### When to Use Opposite Ends

- Array is sorted (or has monotonic property)
- Looking for pairs/boundaries
- Can eliminate one end at each step based on a comparison
