const NewsController = require('../../../src/controllers/news');
const News = require('../../../src/models/news');
const Match = require('../../../src/models/match');
const Tour = require('../../../src/models/tour');
const CustomError = require('../../../src/utils/customError');

describe('news controller', () => {
	describe('getNews method', () => {
		let matchSpy;
		let tourSpy;
		let createNewsSpy;

		beforeEach(() => {
			matchSpy = jest.spyOn(Match, 'getTourIdFromMatchId');
			tourSpy = jest.spyOn(Tour, 'getSportIdFromTourId');
			createNewsSpy = jest.spyOn(News, 'createNews');
		});

		afterEach(() => {
			matchSpy.mockRestore();
			tourSpy.mockRestore();
			createNewsSpy.mockRestore();
		});
		it('should throw error if title is missing', async () => {
			await expect(
				NewsController.createNews({
					description: 'Test Description',
					matchId: '123',
				})
			).rejects.toThrowError('Title is missing');
		});

		it('should throw error if description is missing', async () => {
			await expect(
				NewsController.createNews({ title: 'Test Title', matchId: '123' })
			).rejects.toThrowError('Description is missing');
		});

		it('should throw CustomError if neither matchId nor tourId is present', async () => {
			await expect(
				NewsController.createNews({
					title: 'Test Title',
					description: 'Test Description',
				})
			).rejects.toThrowError('Either matchId or tourId should be present');
		});

		it('should throw CustomError if both matchId and tourId are present', async () => {
			await expect(
				NewsController.createNews({
					title: 'Test Title',
					description: 'Test Description',
					matchId: '123',
					tourId: '456',
				})
			).rejects.toThrowError('Either matchId or tourId should be present');
		});

		it('should throw CustomError if no tour is found for the given match', async () => {
			jest.spyOn(Match, 'getTourIdFromMatchId').mockReturnValue([]);
			await expect(
				NewsController.createNews({
					title: 'Test Title',
					description: 'Test Description',
					matchId: '123',
				})
			).rejects.toThrowError("Didn't find tour for this match");
		});

		it('should throw CustomError if no sport is found for the given tour', async () => {
			tourSpy.mockReturnValue([]);
			await expect(
				NewsController.createNews({
					title: 'Test Title',
					description: 'Test Description',
					tourId: '456',
				})
			).rejects.toThrowError("Didn't find sport for this tour");
		});

		it('should call createNews with correct data for match', async () => {
			matchSpy.mockReturnValue([{ tourId: '789' }]);
			createNewsSpy.mockReturnValue({ msg: 'sucessfull' });
			await NewsController.createNews({
				title: 'Test Title',
				description: 'Test Description',
				matchId: '123',
			});
			expect(News.createNews).toHaveBeenCalledWith({
				title: 'Test Title',
				description: 'Test Description',
				type: 'match',
				matchId: '123',
				tourId: '789',
			});
		});

		it('should call createNews with correct data for tour', async () => {
			tourSpy.mockReturnValue([{ sportId: '987' }]);
			createNewsSpy.mockReturnValue({ msg: 'sucessfull' });
			await NewsController.createNews({
				title: 'Test Title',
				description: 'Test Description',
				tourId: '456',
			});

			expect(News.createNews).toHaveBeenCalledWith({
				title: 'Test Title',
				description: 'Test Description',
				type: 'tour',
				tourId: '456',
				sportId: '987',
			});
		});

		it('should return "Created news" if news creation is successful', async () => {
			matchSpy.mockReturnValue([{ tourId: '789' }]);
			createNewsSpy.mockReturnValue({ msg: 'sucessfull' });
			await expect(
				NewsController.createNews({
					title: 'Test Title',
					description: 'Test Description',
					matchId: '123',
				})
			).resolves.toEqual('Created news');
		});
	});
	describe('getNews method', () => {
		let newsSpy;

		beforeEach(() => {
			newsSpy = jest.spyOn(News, 'getNewsWithFilter');
		});

		afterEach(() => {
			newsSpy.mockRestore();
		});

		it('should throw CustomError when no query param is provided', async () => {
			try {
				await NewsController.getNews({});
			} catch (err) {
				expect(err.message).toBe(
					'Pass atleast one of matchId, tourId, sportId query param'
				);
				expect(err.statusCode).toBe(400);
			}
		});

		it('should call News.getNewsWithFilter with correct data when matchId is provided', async () => {
			const data = { matchId: 'exampleMatchId' };
			const mockResult = [{ id: 1, title: 'test title', description: 'test' }];
			newsSpy.mockReturnValue(mockResult);

			const result = await NewsController.getNews(data);
			expect(result).toBe(mockResult);
		});

		it('should call News.getNewsWithFilter with correct data when tourId is provided', async () => {
			const data = { tourId: 'exampleTourId' };
			const mockResult = [{ id: 1, title: 'test title', description: 'test' }];
			newsSpy.mockReturnValue(mockResult);

			const result = await NewsController.getNews(data);
			expect(result).toBe(mockResult);
		});

		it('should call News.getNewsWithFilter with correct data when sportId is provided', async () => {
			const data = { sportId: 'exampleSportId' };
			const mockResult = [{ id: 1, title: 'test title', description: 'test' }];
			newsSpy.mockReturnValue(mockResult);

			const result = await NewsController.getNews(data);
			expect(result).toBe(mockResult);
		});
	});
});
