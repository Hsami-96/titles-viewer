import { render, waitFor, within, screen } from "@testing-library/react"
import { fetchTitles } from "../../data/dataFetcher"
import { Title } from "../../models/Title"
import Titles from "./Titles"
jest.mock('../../data/dataFetcher')
const result: Title[] = [{
    titleNumber: "NGL931799",
    propertyAddress: "Lower Ground Floor, 36-38 Hatton Garden, London (EC1N 8EB)",
    tenure: "Leasehold",
    xCoordinate: -0.108098777,
    yCoordinate: 51.5201911
}]

test('should render container div', () => { 
    const {container} = render(<Titles/>)
    expect(container.firstChild).toHaveClass('titlesContainer')
})

test('renders titles details', async () => {
    const mockTitlesData = jest.mocked(fetchTitles)
    mockTitlesData.mockImplementationOnce(() => {
        return Promise.resolve(result)
    })
  
    render(<Titles />);
  
    await waitFor(() => {
      const resultTitle = screen.getByText(/NGL931799/i);
      expect(resultTitle).toBeInTheDocument();
    });
  });
  

export {}