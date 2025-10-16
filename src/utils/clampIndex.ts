export default function clampIndex(index: number, length: number) {
    return (index + length) % length;
};