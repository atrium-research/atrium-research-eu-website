/* @jsxImportSource react */

import type { ReactNode } from "react";

interface LogoProps {
	className?: string;
}

export function Logo(props: LogoProps): ReactNode {
	const { className } = props;

	return (
		<svg
			aria-hidden={true}
			className={className}
			fill="currentColor"
			height={16}
			viewBox="0 0 300 300"
			width={16}
		>
			<path d="M98.4 109.79C76.76 129 48.9 141.37 18.28 143.43c.91-18.67 5.7-36.31 13.59-52.15 1.59-3.21 3.33-6.36 5.17-9.41l.01-.01c.74-1.23 1.5-2.43 2.28-3.63 2.13-3.28 4.42-6.47 6.82-9.55 2.62-.19 5.28.07 7.83.8.18.05.36.09.55.16a22.495 22.495 0 0 1 9.35 5.65l34.52 34.52Zm-80.12 46.77c30.62 2.07 58.48 14.43 80.12 33.66l-34.52 34.52a22.546 22.546 0 0 1-7.52 5c-.6.24-1.21.45-1.83.65-.18.07-.36.11-.55.16-2.55.73-5.21.99-7.83.79-1.09-1.4-2.17-2.82-3.2-4.26-2.09-2.9-4.05-5.87-5.92-8.94-.86-1.44-1.71-2.91-2.52-4.38-9.47-17.1-15.24-36.52-16.24-57.19Zm104.25 9.52-15.28 15.28c-15.86-14.23-34.81-25.07-55.73-31.37 20.92-6.3 39.87-17.15 55.72-31.37l15.3 15.29c8.89 8.88 8.89 23.29 0 32.17Zm20.91-147.8c-2.07 30.62-14.43 58.48-33.66 80.12L75.26 63.88a22.71 22.71 0 0 1-6.61-17.71c20.8-16.32 46.63-26.51 74.78-27.89Zm32.95 83.09c1.61 2 3.27 3.95 5 5.85l-15.31 15.31c-8.88 8.89-23.29 8.89-32.17 0l-15.29-15.3c14.24-15.86 25.07-34.81 31.38-55.72 1.33 4.42 2.87 8.74 4.59 12.97.58 1.41 1.18 2.8 1.79 4.2.61 1.38 1.26 2.76 1.91 4.12.99 2.04 2.02 4.07 3.1 6.06 1.08 1.99 2.2 3.96 3.37 5.89.77 1.29 1.58 2.57 2.38 3.84.41.64.83 1.26 1.24 1.88 1.26 1.87 2.55 3.72 3.88 5.54 1.34 1.82 2.71 3.6 4.12 5.35Zm48.34-37.49L190.21 98.4C171 76.76 158.63 48.9 156.57 18.28c28.14 1.37 53.97 11.57 74.76 27.88a22.66 22.66 0 0 1-6.6 17.73Zm23.76 86.11c-20.6 6.21-39.31 16.84-55.03 30.75-.24.22-.47.42-.69.64h-.01l-15.28-15.3c-8.89-8.88-8.89-23.29 0-32.17l15.3-15.29c15.86 14.23 34.81 25.06 55.72 31.37Zm33.23-6.56c-30.64-2.07-58.49-14.43-80.12-33.64l34.52-34.52c2.21-2.21 4.78-3.88 7.52-5 .6-.25 1.21-.47 1.83-.65.18-.06.36-.11.55-.16 2.54-.73 5.2-1 7.82-.81h.01c1.65 2.11 3.24 4.26 4.75 6.46 1.01 1.46 2 2.95 2.95 4.45.48.76.94 1.52 1.41 2.29.93 1.52 1.82 3.08 2.68 4.64 9.37 17.03 15.09 36.36 16.09 56.92Zm-80.12 46.78c21.63-19.22 49.48-31.59 80.12-33.66-1.27 26.26-10.24 50.49-24.67 70.51a147.86 147.86 0 0 1-3.2 4.26h-.01c-2.62.2-5.28-.07-7.82-.79-.18-.05-.36-.1-.55-.16-.61-.19-1.23-.41-1.83-.65-2.74-1.11-5.3-2.78-7.52-5L201.6 190.2Z" />
			<path d="M192.76 181.37c-.33.3-.65.59-.97.87.33-.28.65-.58.98-.86.23-.22.45-.42.69-.64-.24.2-.48.42-.7.62Zm-11.37-74.15c-1.73-1.9-3.38-3.85-5-5.85 1.61 2 3.27 3.95 4.98 5.86h.01Zm-.01 85.55c-1.71 1.9-3.38 3.85-4.98 5.85 1.61-2 3.27-3.95 4.98-5.85Zm-9.11-96.75c1.33 1.82 2.7 3.6 4.12 5.35a154.84 154.84 0 0 1-4.12-5.35Zm4.12 102.6c-1.42 1.75-2.79 3.53-4.12 5.35 1.34-1.82 2.71-3.6 4.12-5.35Zm-8-108.14c1.25 1.87 2.54 3.72 3.88 5.54-1.33-1.82-2.62-3.67-3.88-5.54Zm3.88 113.48a148.93 148.93 0 0 0-3.88 5.54c1.26-1.87 2.55-3.72 3.88-5.54Z" />
			<path d="M248.49 149.99c-20.6 6.21-39.31 16.84-55.03 30.75-.24.22-.47.42-.69.64h-.01l-15.28-15.3c-8.89-8.88-8.89-23.29 0-32.17l15.3-15.29c15.86 14.23 34.81 25.06 55.72 31.37Zm33.23-6.56c-30.64-2.07-58.49-14.43-80.12-33.64l34.52-34.52c2.21-2.21 4.78-3.88 7.52-5 .6-.24 1.21-.45 1.83-.65.18-.06.36-.11.55-.16 2.55-.73 5.21-.99 7.83-.8 1.65 2.1 3.24 4.25 4.75 6.45 1.01 1.46 2 2.95 2.95 4.45.48.76.94 1.52 1.41 2.29.93 1.53 1.82 3.08 2.68 4.64 9.37 17.03 15.09 36.36 16.09 56.92Zm-80.12 46.78c21.63-19.22 49.48-31.59 80.12-33.66-1.27 26.26-10.24 50.49-24.67 70.51a147.86 147.86 0 0 1-3.2 4.26c-2.62.19-5.28-.07-7.83-.79-.18-.05-.36-.1-.55-.16-.61-.19-1.23-.41-1.83-.65-2.74-1.11-5.3-2.78-7.52-5L201.6 190.2Zm-91.81 11.39c19.22 21.64 31.59 49.5 33.66 80.12-28.15-1.36-53.97-11.57-74.77-27.88a22.626 22.626 0 0 1 6.6-17.72l34.52-34.52Zm48.5 25.6c-.65 1.36-1.29 2.74-1.91 4.12-.61 1.38-1.21 2.79-1.79 4.2-1.71 4.22-3.26 8.55-4.59 12.97-6.31-20.9-17.15-39.86-31.38-55.72l15.29-15.29c8.88-8.89 23.29-8.89 32.17 0l15.29 15.29c-1.71 1.9-3.37 3.85-4.98 5.85a154.84 154.84 0 0 0-4.12 5.35c-1.33 1.82-2.62 3.67-3.88 5.54-.41.62-.83 1.26-1.24 1.9-.81 1.26-1.61 2.54-2.38 3.83a149.5 149.5 0 0 0-3.37 5.9c-1.08 1.99-2.11 4.01-3.1 6.06Zm73.05 26.64c-20.8 16.32-46.62 26.51-74.77 27.89 2.07-30.62 14.43-58.48 33.64-80.12l34.52 34.52a22.71 22.71 0 0 1 6.61 17.71ZM98.4 109.79C76.76 129 48.9 141.37 18.28 143.43c.91-18.67 5.7-36.31 13.59-52.15 1.6-3.21 3.33-6.35 5.17-9.41l.01-.01c.74-1.23 1.5-2.43 2.28-3.63 2.13-3.28 4.42-6.47 6.82-9.55h.01c2.62-.2 5.28.07 7.82.8.18.05.36.09.55.16.61.18 1.23.4 1.83.65 2.74 1.11 5.3 2.77 7.52 5l34.52 34.52Zm-80.12 46.77c30.62 2.07 58.48 14.43 80.12 33.66l-34.52 34.52a22.546 22.546 0 0 1-7.52 5c-.6.24-1.21.45-1.83.65-.18.07-.36.11-.55.16-2.54.73-5.2 1-7.82.81h-.01c-1.09-1.41-2.16-2.83-3.2-4.27-2.09-2.9-4.05-5.87-5.92-8.94-.86-1.44-1.71-2.91-2.52-4.38-9.47-17.1-15.24-36.52-16.24-57.19Zm104.25 9.52-15.28 15.28c-15.86-14.23-34.81-25.07-55.73-31.37 20.92-6.3 39.87-17.15 55.72-31.37l15.3 15.29c8.89 8.88 8.89 23.29 0 32.17Z" />
		</svg>
	);
}