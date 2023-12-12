interface headingProps {
	title: string;
	description?: string;
}

const SectionHeading: React.FC<headingProps> = ({ title, description }) => {
	return (
		<>
			<h2 className="text-2xl font-semibold  tracking-tight px-4">
				{title}
			</h2>
			<p className="text-sm  pt-1 pb-2 px-4">{description}</p>
		</>
	);
};
export default SectionHeading;
